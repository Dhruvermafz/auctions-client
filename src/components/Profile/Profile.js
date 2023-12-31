import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { clearAlerts } from "../../actions/alert";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Fab from "@mui/material/Fab";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import FiberDotIcon from "@mui/icons-material/FiberManualRecord";
import EditIcon from "@mui/icons-material/Edit";
import UsernameIcon from "@mui/icons-material/AlternateEmail";
import FaceIcon from "@mui/icons-material/Face";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import PhoneIcon from "@mui/icons-material/PhoneIphone";
import EventIcon from "@mui/icons-material/Event";
import TrophyIcon from "@mui/icons-material/EmojiEventsOutlined";
import GavelIcon from "@mui/icons-material/Gavel";
import Spinner from "../Extras/Spinner";
import Alert from "../Extras/Alert";
// import ChangeAvatarModal from "../components/ChangeAvatarModal";

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
  const [modalToggle, setModalToggle] = useState(false);
  const elementRef = useRef(null);
  const dispatch = useDispatch();

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.up("sm"));

  const openModal = () => setModalToggle(true);
  const closeModal = () => setModalToggle(false);

  return (
    <Container maxWidth={"md"} sx={{ my: 6 }}>
      {props.loading ? (
        <Spinner />
      ) : props.user ? (
        <Paper elevation={3}>
          <Stack alignItems="center" p={4}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={5}
              justifyContent="center"
              alignItems="center"
            >
              <Box as={Stack} spacing={3} alignItems="center">
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <Fab
                      onClick={openModal}
                      color="secondary"
                      size="small"
                      aria-label="edit"
                    >
                      <EditIcon />
                    </Fab>
                  }
                >
                  <Box
                    sx={{
                      p: 0.5,
                      border: "4px dotted",
                      borderColor: "secondary.main",
                      borderRadius: "50%",
                    }}
                  >
                    <Avatar
                      sx={{ width: 200, height: 200 }}
                      alt={props.user.username}
                      src={props.user.avatar}
                    />
                  </Box>
                </Badge>
                <Typography variant="h3" component="h1" gutterBottom>
                  {props.user.username} <FiberDotIcon color="success" />
                </Typography>
              </Box>
              <Divider
                orientation={isSmall ? "vertical" : "horizontal"}
                flexItem
              />
              <Stack spacing={3}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <UsernameIcon color="secondary" />
                  <Typography
                    ref={elementRef}
                    title="User ID"
                    variant="subtitle1"
                    gutterBottom
                  >
                    {props.user._id}
                  </Typography>
                  {/* <CopyText title="Copy User ID" elementRef={elementRef} /> */}
                </Stack>
                <Stack direction="row" spacing={1}>
                  <FaceIcon color="secondary" />
                  <Typography variant="subtitle1" gutterBottom>
                    Full Name:
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {props.user.username}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <EmailIcon color="secondary" />
                  <Typography variant="subtitle1" gutterBottom>
                    E-mail:
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {props.user.email}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <PhoneIcon color="secondary" />
                  <Typography variant="subtitle1" gutterBottom>
                    Mobile:
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    +91-{props.user.mobile}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <EventIcon color="secondary" />
                  <Typography variant="subtitle1" gutterBottom>
                    Date of Birth:
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {new Date(props.user.dateOfBirth)
                      .toString()
                      .substring(0, 15)}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <TrophyIcon color="secondary" />
                  <Typography variant="subtitle1" gutterBottom>
                    Auctions Won:
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {props.user.auctionsWonCount}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <GavelIcon color="secondary" />
                  <Typography variant="subtitle1" gutterBottom>
                    Auctions Initiated:
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {props.user.auctionsInitiatedCount}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Box mt={4}>
              <Link to="/profile/update">
                <Button color="secondary" variant="contained">
                  Update Profile
                </Button>
              </Link>
            </Box>
          </Stack>
          {/* <ChangeAvatarModal
            openState={modalToggle}
            closeHandler={closeModal}
          /> */}
        </Paper>
      ) : null}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { clearAlerts })(Profile);
