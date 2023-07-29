import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { clearAlerts } from "../../actions/alert";
import Spinner from "../Extras/Spinner";
import "../css/profile.css"; // Import the CSS file

const Profile = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      props.clearAlerts();
    };
  }, []);

  // check if user is logged
  if (!props.isAuth) {
    navigate("/login");
  }

  return props.loading ? (
    <Spinner />
  ) : (
    <>
      <Box className="ProfileContainer">
        <Paper className="ProfilePaper">
          <Typography variant="h5" className="ProfileHeading">
            My Profile
          </Typography>
          <Table className="ProfileTable" aria-label="simple table">
            <TableBody>
              <TableRow className="ProfileTableRow" key="Username">
                <TableCell align="right" className="ProfileTableCell">
                  Username
                </TableCell>
                <TableCell align="left" className="ProfileTableCell">
                  {props.user.username}
                </TableCell>
              </TableRow>
              <TableRow className="ProfileTableRow">
                <TableCell align="right" className="ProfileTableCell">
                  Email
                </TableCell>
                <TableCell align="left" className="ProfileTableCell">
                  {props.user.email}
                </TableCell>
              </TableRow>
              <TableRow className="ProfileTableRow">
                <TableCell align="right" className="ProfileTableCell">
                  Phone
                </TableCell>
                <TableCell align="left" className="ProfileTableCell">
                  {props.user.phone}
                </TableCell>
              </TableRow>
              <TableRow className="ProfileTableRow">
                <TableCell align="right" className="ProfileTableCell">
                  Address
                </TableCell>
                <TableCell align="left" className="ProfileTableCell">
                  {props.user.address}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { clearAlerts })(Profile);
