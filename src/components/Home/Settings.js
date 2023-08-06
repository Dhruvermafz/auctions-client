import React from "react";
import {
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Slider,
  Button,
  Container,
} from "@mui/material";

const Settings = () => {
  const [notifications, setNotifications] = React.useState(true);
  const [bidIncrement, setBidIncrement] = React.useState(10);

  const handleNotificationsChange = () => {
    setNotifications((prevNotifications) => !prevNotifications);
  };

  const handleBidIncrementChange = (event, newValue) => {
    setBidIncrement(newValue);
  };

  const handleSave = () => {
    // Logic to save auction settings
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Auction Settings
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={notifications}
              onChange={handleNotificationsChange}
            />
          }
          label="Receive Notifications"
        />
        <Typography gutterBottom>Bid Increment</Typography>
        <Slider
          value={bidIncrement}
          onChange={handleBidIncrementChange}
          aria-labelledby="bid-increment-slider"
          step={1}
          min={1}
          max={50}
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Settings
        </Button>
      </Paper>
    </Container>
  );
};

export default Settings;
