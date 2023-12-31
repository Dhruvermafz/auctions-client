import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import openSocket from "socket.io-client";
import { Button, Box, ButtonGroup } from "@mui/material";
import "../css/board.css";
import {
  adAreaStyle,
  boardCardStyle,
  boardStyle,
  paginationStyle,
} from "../css/boardStyle";
import { loadAds, adPostedByOther, updateAdInList } from "../../actions/ad";
import { setAlert, clearAlerts } from "../../actions/alert";
import Spinner from "../Extras/Spinner";
import MediaCard from "./Card";
import { REACT_APP_API_BASE_URL } from "../../config";

const Board = ({
  loadAds,
  adPostedByOther,
  updateAdInList,
  setAlert,
  clearAlerts,
  ads,
  loading,
  isAuth,
  user,
  passedUser,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [adPerPage] = useState(6);

  useEffect(() => {
    const initializeSocket = () => {
      const socket = openSocket(REACT_APP_API_BASE_URL);

      socket.on("addAd", (data) => {
        console.log(data);

        if (
          isAuth &&
          data.ad.owner &&
          data.ad.owner.toString() !== user?._id?.toString()
        ) {
          clearAlerts();
          setAlert("New ads available", "info", 60000);
        }
      });

      socket.on("auctionStarted", (res) => {
        updateAdInList(res.data);
      });
      socket.on("auctionEnded", (res) => {
        updateAdInList(res.data);
      });

      return () => {
        socket.emit("leaveHome");
        socket.off();
        clearAlerts();
      };
    };

    if (passedUser) {
      loadAds(passedUser);
    } else {
      loadAds();
      initializeSocket();
    }
  }, [
    loadAds,
    adPostedByOther,
    updateAdInList,
    setAlert,
    clearAlerts,
    isAuth,
    user,
    passedUser,
  ]);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  const filteredAds = ads.filter((ad) => !ad.auctionEnded);
  const lastAdIndex = pageNumber * adPerPage;
  const firstAdIndex = lastAdIndex - adPerPage;
  const numPages = Math.ceil(filteredAds.length / adPerPage);
  const pageNumberButtons = Array.from(
    { length: numPages },
    (_, index) => index + 1
  );

  const clickPageNumerButton = (num) => {
    setPageNumber(num);
  };

  return loading ? (
    <Spinner />
  ) : (
    <Box sx={boardStyle}>
      <Box sx={adAreaStyle}>
        {filteredAds.slice(firstAdIndex, lastAdIndex).map((ad) => (
          <div className="product__container" key={ad._id}>
            <MediaCard
              ad={ad}
              key={ad._id}
              dashCard={false}
              cardStyle={boardCardStyle}
            />
          </div>
        ))}
      </Box>

      <Box sx={paginationStyle}>
        <ButtonGroup variant="outlined" size="small">
          <Button
            disabled={pageNumber === 1}
            onClick={() => clickPageNumerButton(pageNumber - 1)}
          >
            Prev
          </Button>
          {pageNumberButtons.map((num) => (
            <Button
              key={num}
              disabled={pageNumber === num}
              onClick={() => clickPageNumerButton(num)}
            >
              {num}
            </Button>
          ))}
          <Button
            disabled={pageNumber === pageNumberButtons.length}
            onClick={() => clickPageNumerButton(pageNumber + 1)}
          >
            Next
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  ads: state.ad.ads,
  loading: state.auth.loading,
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  loadAds,
  adPostedByOther,
  setAlert,
  updateAdInList,
  clearAlerts,
})(Board);
