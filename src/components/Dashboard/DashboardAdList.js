import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingDisplay from "../Extras/LoadingDisplay";
import Card from "./Card";
import { Button, Box, ButtonGroup } from "@mui/material";
import {
  boardStyle,
  adAreaStyle,
  paginationStyle,
  dashCardStyle,
} from "../css/dashStyle";
import { REACT_APP_API_BASE_URL } from "../../config";
const DashboardAdList = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // pagination

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

  return loading ? (
    <LoadingDisplay />
  ) : (
    <>
      <Box sx={boardStyle}>
        <Box sx={adAreaStyle}>
          {ads.slice(firstAdIndex, lastAdIndex).map((ad) => {
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
          })}
        </Box>
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
      </Box>
    </>
  );
};

export default DashboardAdList;
