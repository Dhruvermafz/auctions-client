import React from "react";
import { connect } from "react-redux";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";
import { removeAlert } from "../../actions/alert";

const ErrorAlert = (props) => {
  return (
    <>
      {props.alerts !== null &&
        props.alerts.length > 0 &&
        props.alerts.map((alert) => (
          <Box key={alert.id} sx={{ width: "100%", mb: 2 }}>
            <Alert
              severity={alert.type ? alert.type : "error"}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    props.removeAlert(alert.id);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {alert.msg}
            </Alert>
          </Box>
        ))}
    </>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { removeAlert })(ErrorAlert);
