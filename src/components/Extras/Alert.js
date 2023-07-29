import React from "react";
import { connect } from "react-redux";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { removeAlert } from "../../actions/alert";

const Alert = (props) => {
  const handleClose = (id) => {
    props.removeAlert(id);
  };

  return (
    <>
      {props.alerts.map((alert) => (
        <Snackbar
          key={alert.id}
          open={true}
          autoHideDuration={6000}
          onClose={() => handleClose(alert.id)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity={alert.type ? alert.type : "error"}
            onClose={() => handleClose(alert.id)}
          >
            {alert.msg}
          </MuiAlert>
        </Snackbar>
      ))}
    </>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { removeAlert })(Alert);
