import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import axios from "axios";
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Spinner from '../Extras/Spinner';
import Alert from '../Extras/Alert';
import Card from '../Dashboard/Card';
import {
    boardStyle,
    adAreaStyle,
    paginationStyle,
    dashCardStyle,
  } from "../css/dashStyle";
import { loadAdDetails } from '../../actions/ad';
import { REACT_APP_API_BASE_URL } from "../../config";
import { Button, Box, ButtonGroup } from "@mui/material";
const MyAuctions = () => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [adPerPage] = useState(4);
 

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const res = await axios.get(
        `${REACT_APP_API_BASE_URL}/user/products/posted`
      );
      setAds(res.data);
      setLoading(false);
    };
    fetchData();
  }, []);


  let lastAdIndex = pageNumber * adPerPage;
  let firstAdIndex = lastAdIndex - adPerPage;
  let pageNumbers = [];
  const num = Math.ceil(ads.length / adPerPage);

  for (let i = 1; i <= num; i++) {
    pageNumbers.push(i);
  }
  const clickPageNumberButton = (num) => {
    setPageNumber(num);
  };
  return (
    <>
      <Container sx={{ mb: 4 }}>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={12}>
            <Typography
              variant='h2'
              textAlign='center'
              sx={{ my: 3 }}
              component='h1'
            >
              My Auctions
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' textAlign='center' color='grey'>
              Below is a list of auctions that you have initiated
            </Typography>
          </Grid>
          {loading ? (
            <Grid item xs={10} sm={6}>
              <Spinner />
            </Grid>
          ) : ads?.length === 0 ? (
            <Grid item mt={5} xs={12}>
              <Alert
                title='No auction found!'
                message={`It looks like you haven't created any auctions yet. Once you create an auction, it will appear here.`}
                severity='warning'
              />
            </Grid>
          ) : (
            ads.slice(firstAdIndex, lastAdIndex).map((ad) => {
                return (
                  <div className="ad__container" key={ad._id}>
                    <Card
                      ad={ad}
                      key={ad._id}
                      dashCard={true}
                      cardStyle={dashCardStyle}
                    />
                  </div>
                );
              })
          )}
        </Grid>
        {ads.length !== 0 && (
          <Box sx={paginationStyle}>
            <ButtonGroup variant="outlined" size="small">
              <Button
                disabled={pageNumber === 1}
                onClick={(e) => clickPageNumberButton(pageNumber - 1)}
              >
                Prev
              </Button>
              {pageNumbers.map((num) => {
                return (
                  <Button
                    key={num}
                    disabled={pageNumber === num}
                    onClick={(e) => clickPageNumberButton(num)}
                  >
                    {num}
                  </Button>
                );
              })}
              <Button
                disabled={pageNumber === pageNumbers[pageNumbers.length - 1]}
                onClick={(e) => clickPageNumberButton(pageNumber + 1)}
              >
                Next
              </Button>
            </ButtonGroup>
          </Box>
        )}
      </Container>
  
    </>
  );
};

export default MyAuctions;