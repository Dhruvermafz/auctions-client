import * as React from "react";
import { connect } from "react-redux";
import { Card } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  loadAdDetails,
  loadAdImage,
  setImageLoadingStatus,
} from "../../actions/ad";
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import imagePlaceholder from "../../images/no-image-icon.png";
import { secondToHmsShort } from "../../utils/secondToHms";

function MediaCard(props) {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    navigate(`/ads/${props.ad._id}`);
  };

  const updateAuctionStatus = (ad) => {
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
          {!props.dashCard && (
            <CardMedia
              component="img"
              height="180"
              src={props.ad.image ? props.ad.image : imagePlaceholder}
              alt="green iguana"
            />
          )}

          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {props.ad.productName}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Price: ${props.ad.currentPrice.$numberDecimal}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Remaining: {secondToHmsShort(props.ad.timer)}
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
