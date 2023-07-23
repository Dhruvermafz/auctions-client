import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import openSocket from "socket.io-client";
import {
  loadAdDetails,
  loadAdImage,
  loadHighestBid,
  placeBid,
  startAuction,
  updateTimer,
  clearAdDetails,
  updateAdDetails,
  clearAdImage,
  setImageLoadingStatus,
} from "../../actions/ad";
import { setAlert, clearAlerts } from "../../actions/alert";
import {
  Paper,
  Box,
  Typography,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import Alert from "../Extras/Alert";
import Spinner from "../Extras/Spinner";
import LoadingDisplay from "../Extras/LoadingDisplay";
import imagePlaceholder from "../../images/no-image-icon.png";
import {
  boxStyle,
  adArea,
  imageStyle,
  paperStyle,
  descriptionArea,
  imageContainer,
  bidContainer,
  bidButtonStyle,
} from "../css/adStyles";
import { secondsToHms } from "../../utils/secondToHms";
import { REACT_APP_API_BASE_URL } from "../../config";

const Ad = (props) => {
  const params = useParams();
  const [bidPrice, setBidPrice] = useState(0);
  const [bidButton, setBidButton] = useState(true);
  const [ownerAd, setOwnerAd] = useState(false);
  const [startButton, setStartButton] = useState(true);
  const navigate = useNavigate();

  const updateBidButtonStatus = (updatedPrice) => {
    if (
      updatedPrice > Number(props.adDetails.currentPrice.$numberDecimal) &&
      props.adDetails.auctionStarted &&
      !props.adDetails.auctionEnded
    ) {
      setBidButton(false);
    } else {
      setBidButton(true);
    }
  };

  useEffect(() => {
    props.clearAlerts();
    props.setImageLoadingStatus();
    props.loadAdDetails(params.adId);
  }, [params.adId]);

  useEffect(() => {
    if (props.adDetails.image) {
      props.loadAdImage(props.adDetails.image);
    }
  }, [props.adDetails.image]);

  useEffect(() => {
    updateBidButtonStatus(bidPrice);
  }, [bidPrice, props.adDetails.auctionEnded]);

  useEffect(() => {
    const adSocket = openSocket(REACT_APP_API_BASE_URL, {
      path: "/socket/adpage",
    });

    adSocket.emit("joinAd", { ad: params.adId.toString() });

    // user enters add page
    adSocket.on("auctionStarted", (res) => {
      console.log(res);
      props.updateAdDetails(res.ad);
      props.clearAlerts();
      if (res.action === "started") props.setAlert("Auction started", "info");
    });

    adSocket.on("auctionEnded", (res) => {
      if (res.action === "sold") {
        props.updateAdDetails(res.ad);
        props.clearAlerts();
        props.setAlert(
          `Auction ended, item sold to ${res.winner.username}!`,
          "info"
        );
      } else {
        props.updateAdDetails(res.data);
        props.clearAlerts();
        props.setAlert("Item not sold", "info");
      }
    });

    // timer
    adSocket.on("timer", (res) => {
      props.updateTimer(res.data);
    });

    adSocket.on("bidPosted", (res) => {
      console.log("bidPosted");
      props.loadHighestBid(res.data._id);
      props.updateAdDetails(res.data);
    });

    return () => {
      adSocket.emit("leaveAd", { ad: params.adId.toString() });
      adSocket.off();
      props.clearAdDetails();
      props.clearAdImage();
    };
  }, [params.adId]);

  // check if current user is the owner of ad

  useEffect(() => {
    if (props.adDetails.owner && props.auth.user) {
      if (props.adDetails.owner._id === props.auth.user._id) setOwnerAd(true);
      else setOwnerAd(false);
    }

    // check start button

    if (!props.adDetails.auctionStarted && !props.adDetails.auctionEnded) {
      setStartButton(true);
    } else {
      setStartButton(false);
    }
  }, [
    props.adDetails.owner,
    props.auth.user,
    props.adDetails.auctionStarted,
    props.adDetails.auctionEnded,
  ]);

  if (props.authLoading) {
    return <Spinner />;
  }

  // check if user is logged
  if (!props.isAuth) {
    navigate("/login");
  }

  if (props.loading || props.loadingHighestBid) {
    console.log("loading");
    return <Spinner />;
  }

  const handleBidPriceChange = (e) => {
    setBidPrice(e.target.value);
  };

  const handleSubmitBid = (e) => {
    e.preventDefault();
    // place bid
    props.placeBid(props.adDetails._id, bidPrice);
  };

  const handleStartAuction = (e) => {
    e.preventDefault();
    props.startAuction(props.adDetails._id);
    props.setAlert("Auction started", "success");
  };

  const getTimeRemaining = () => {
    return secondsToHms(props.adDetails.timer);
  };

  const getUTCDate = (dt) => {
    let isodt = new Date(dt);
    return isodt.toDateString();
  };

  // auction status based on the ad details
  const auctionStatus = () => {
    if (props.adDetails.sold) {
      return "Sold";
    } else if (props.adDetails.auctionEnded) {
      return "Ended, not sold";
    } else if (!props.adDetails.auctionStarted) {
      return "Upcoming";
    } else {
      return "Ongoing";
    }
  };

  return (
    <div className="ad__page">
      {props.loading ? (
        <LoadingDisplay />
      ) : (
        <>
          <Alert />
          {!props.adDetails.owner ? (
            <LoadingDisplay />
          ) : (
            <Box sx={boxStyle}>
              <Paper sx={paperStyle}>
                <Typography variant="h4">
                  {props.adDetails.productName}
                </Typography>

                <Box sx={adArea}>
                  <Box sx={imageContainer}>
                    {!props.imageLoading && (
                      <img
                        src={
                          props.adDetails.image
                            ? props.adImage
                            : imagePlaceholder
                        }
                        alt={props.adDetails.productName}
                        style={imageStyle}
                      />
                    )}
                  </Box>

                  <Box sx={descriptionArea}>
                    <Typography variant="h6">Description</Typography>
                    <Typography variant="body2">
                      {props.adDetails.description}
                    </Typography>
                    <Divider variant="middle" sx={{ margin: ".5rem" }} />

                    <Typography variant="h6">Info</Typography>
                    <Typography variant="body1">
                      Posted on: {getUTCDate(props.adDetails.createdAt)}
                    </Typography>
                    <Typography variant="body1">
                      Seller: {props.adDetails.owner.username}
                    </Typography>
                    <Typography variant="body1">
                      Base price: {props.adDetails.basePrice.$numberDecimal}
                    </Typography>
                    <Divider variant="middle" sx={{ margin: ".5rem" }} />

                    <Typography variant="h6">Auction</Typography>
                    <Typography variant="body1">
                      Status: {auctionStatus()}
                    </Typography>
                    <Typography variant="body1">
                      Bids: {props.adDetails.bids.length}
                    </Typography>
                    <Typography variant="body1">
                      Time remaining: {getTimeRemaining()}
                    </Typography>
                    <Typography variant="body1">
                      Current price: $
                      {props.adDetails.currentPrice.$numberDecimal}
                    </Typography>
                    <Typography variant="body1">
                      Current bidder:{" "}
                      {props.highestBid && props.highestBid.user.username}
                    </Typography>
                    <Divider variant="middle" sx={{ margin: ".5rem" }} />

                    {!ownerAd && (
                      <Box sx={bidContainer}>
                        <TextField
                          label="$"
                          id="bid-price"
                          size="small"
                          onChange={(e) => {
                            handleBidPriceChange(e);
                          }}
                        />
                        <Box sx={{ height: "auto" }}>
                          <Button
                            variant="contained"
                            disabled={bidButton}
                            onClick={(e) => handleSubmitBid(e)}
                            sx={bidButtonStyle}
                          >
                            Place bid
                          </Button>
                        </Box>
                      </Box>
                    )}
                    {ownerAd && (
                      <Box sx={bidContainer}>
                        <Box sx={{ height: "auto" }}>
                          <Button
                            variant="contained"
                            disabled={!startButton}
                            onClick={(e) => handleStartAuction(e)}
                            sx={bidButton}
                          >
                            Start Auction
                          </Button>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Paper>
            </Box>
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  adDetails: state.ad.adDetails,
  loading: state.ad.loading,
  authLoading: state.auth.loading,
  isAuth: state.auth.loading,
  alerts: state.auth.isAuthenticated,
  highestBid: state.ad.highestBid,
  loadingBid: state.ad.loadingHighestBid,
  auth: state.auth,
  adImage: state.ad.adImage,
  imageLoading: state.ad.imageLoading,
});

export default connect(mapStateToProps, {
  loadAdDetails,
  loadAdImage,
  loadHighestBid,
  placeBid,
  startAuction,
  setAlert,
  clearAlerts,
  updateTimer,
  updateAdDetails,
  clearAdImage,
  setImageLoadingStatus,
  clearAdDetails,
})(Ad);
