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
} from "../../actions/ad";
import { setAlert, clearAlerts } from "../../actions/alert";
import { Paper, Box, Typography, Divider, TextField, Button } from "@mui/material";
import Alert from "@mui/material";
import Spinner from "../Extras/Spinner";
import LoadingDisplay from '../Extras/LoadingDisplay'
import imagePlaceholder from '../../images/no-image-icon.png'
import {
    boxStyle,
    adArea,
    imageStyle,
    paperStyle,
    descriptionArea,
    imageContainer,
    bidContainer,
    bidButtonStyle,
  } from './css/adStyles.js';
import { secondsToHms } from "../../utils/secondToHms";
import { REACT_APP_API_BASE_URL } from "../../config";

const Ad = (props) => {
    const params = useParams();
    const [bidPrice, setBidPrice] = useState(0);
    const [bidButton, setBidButton] = useState(true);
    const [ownerAd, setOwnerAd]  = useState(false)
    const [startButotn, setButton] = useState(true)
    const navigate = useNavigate();

    const updateBidButtonStatus = (updatedPrice) => {
              if(updatedPrice > Number(props.adDetails.currentPrice.$numberDecimal) && props.adDetails.auctionStarted && !props.adDetails.auctionEnded) {
                setBidButton(false);
              } else {
                setBidButton(true)
              }
    }

    useEffect(() => {
        props.clearAlerts();
        props.setImageLoadingStatus()
        props.loadAdDetails(params.adId);
    }, [params.adId])

    useEffect(() => {
        if(props.adDetails.image) {
            props.loadAdImage(props.adDetails.image)
        }
    }, [props.adDetails.image])

    useEffect(() => {
        updateBidButtonStatus(bidPrice);
    }, [bidPrice, props.adDetails.auctionEnded])

    useEffect(() => {
        const adSocket = openSocket(REACT_APP_API_BASE_URL, {
            path: '/socket/adpage'
        })

        adSocket.emit('joinAd', {ad: params.adId.toString()})

        // user enters add page
        adSocket.on('auctionStarted', (res) => {
            
        })
    })
  return <div></div>;
};

export default Ad;
