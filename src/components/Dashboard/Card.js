import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  loadAdDetails,
  loadAdImage,
  setImageLoadingStatus,
} from "../../actions/ad";
import imagePlaceholder from "../../images/no-image-icon.png";
import { secondsToHmsShort } from "../../utils/secondToHms";

function MediaCard(props) {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    navigate(`/ads/${props.ad._id}`);
  };

  const updateAuctionStatus = ({ ad }) => {
    if (ad.sold) {
      return "Sold";
    } else if (ad.auctionEnded) {
      return "Ended, not sold";
    } else if (!ad.auctionStarted) {
      return "Upcoming";
    } else {
      return "Ongoing";
    }
  };

  return (
    <a
      onClick={(e) => {
        handleCardClick(e);
      }}
      style={{ textDecoration: "none" }}
    >
      <Card style={props.cardStyle}>
        <CardActionArea>
          {!props.dashStyle && (
            <CardMedia
              component="img"
              height="180"
              src={props.adDetails.image ? props.adImage : imagePlaceholder}
              alt="green iguana"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {props.adDetails.productName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: $ {props.adDetails.currentPrice.$numberDecimal}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Remaining: {secondsToHmsShort(props.adDetails.timer)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Status: {updateAuctionStatus(props.ad)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </a>
  );
}

const mapStateToProps = (state) => ({
  adDetails: state.ad.adDetails,
});

export default connect(mapStateToProps, {
  loadAdDetails,
  loadAdImage,
  setImageLoadingStatus,
})(MediaCard);
