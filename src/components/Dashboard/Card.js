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

function MediaCard({ ad, cardStyle, dashCard }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/ads/${ad._id}`);
  };

  const updateAuctionStatus = () => {
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
    <Card style={cardStyle}>
      <CardActionArea onClick={handleCardClick}>
        {!dashCard && (
          <CardMedia
            component="img"
            height="180"
            src={ad.image ? ad.image : imagePlaceholder}
            alt="green iguana"
          />
        )}

        <CardContent>
          <Typography gutterBottom variant="h6">
            {ad.productName}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Price: ${ad.currentPrice.$numberDecimal}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Remaining: {secondsToHmsShort(ad.timer)}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Status: {updateAuctionStatus()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
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
