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
import Card from "./Card";

const Board = (props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [adPerPage] = useState(6);

  useEffect(() => {
    if (props.passedUser) {
      props.loadAds(props.passedUser);
    } else {
      props.loadAds();
      const socket = openSocket(process.env.REACT_APP_API_BASE_URL);

      socket.on("addAd", (data) => {
        console.log(data);

        if (
          props.user &&
          data.ad.owner &&
          data.ad.owner.toString() !== props.user._id.toString()
        ) {
          props.clearAlerts();
          props.setAlert("New ads available", "info", 60000);
        }
      });

      // when auction starts/ends
      socket.on("auctionStarted", (res) => {
        props.updateAdInList(res.data);
      });
      socket.on("auctionEnded", (res) => {
        props.updateAdInList(res.data);
      });

      return () => {
        socket.emit("leaveHome");
        socket.off();
        props.clearAlerts();
      };
    }
  }, []);

  if (!props.isAuth) {
    return <Navigate to="/login" />;
  }

  // Filter ads with auctionEnded === false
  const filteredAds = props.ads.filter((ad) => !ad.auctionEnded);

  // pagination
  let lastAdIndex = pageNumber * adPerPage;
  let firstAdIndex = lastAdIndex - adPerPage;

  // page number for buttons
  let pageNumberButtons = [];
  const numPages = Math.ceil(filteredAds.length / adPerPage);

  for (let i = 1; i <= numPages; i++) {
    pageNumberButtons.push(i);
  }

  // when page number button is clicked
  const clickPageNumerButton = (num) => {
    setPageNumber(num);
  };

  return props.loading ? (
    <Spinner />
  ) : (
    <Box sx={boardStyle}>
      <Box sx={adAreaStyle}>
        {filteredAds.slice(firstAdIndex, lastAdIndex).map((ad) => (
          <div className="product__container" key={ad._id}>
            <Card
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
