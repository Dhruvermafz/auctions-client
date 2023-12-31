import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import IconButton from '@mui/material/IconButton';
import Info from '@mui/icons-material/InfoOutlined';
import Spinner from '../Extras/Spinner';
import Alert from '../Extras/Alert';
import Table from '../Table/Table';
import { purchasedListContainerStyle } from '../css/dashStyle';
import LoadingDisplay from '../Extras/LoadingDisplay';
import DashPurchasedList from '../Dashboard/DashPurchasedList';

const columns = [
  {
    label: 'Item Name',
    path: 'itemName',
  },
  {
    label: 'State',
    path: 'state',
  },
  {
    label: 'Started At',
    path: 'startTime',
    content: (ad) => new Date(ad.startTime).toLocaleString(),
  },
  {
    label: 'Ended At',
    path: 'endTime',
    content: (ad) => new Date(ad.endTime).toLocaleString(),
  },
  {
    label: 'View ad',
    key: '1',
    content: (ad) => (
      <Link to={`/ads/${ad._id}`}>
        <IconButton aria-label='info'>
          <Info color='secondary' />
        </IconButton>
      </Link>
    ),
  },
];

const WonAds = ({ purchasedLoading, ads, props }) => {
  const navigate = useNavigate();

  const handlePurchasedDetails = (adId) => {
    navigate('/ads/' + adId);
  };

  return (
    <Container sx={purchasedListContainerStyle}>
      <Typography variant='h2' textAlign='center' sx={{ my: 3 }} component='h1'>
        Won ads
      </Typography>
      <Typography variant='body1' textAlign='center' color='grey'>
        ads where you emerged as the winning bidder
      </Typography>

      {purchasedLoading ? (
        <LoadingDisplay />
      ) : ads && ads.length === 0 ? (
        <Box mt={5}>
          <Alert
            title='No ad found!'
            message={`You haven't won an ad yet. Keep trying and you'll be successful!.`}
            severity='warning'
          />
        </Box>
      ) : ads ? (
        <TableContainer sx={{ mt: 5 }} component={Paper}>
          <Table columns={columns} data={ads} />
          <DashPurchasedList ads={props.purchased} />
        </TableContainer>
      ) : null}
    </Container>
  );
};

export default WonAds;
