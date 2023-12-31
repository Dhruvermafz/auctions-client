import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AuctionTimer from "./AuctionTimer";
import openSocket from "socket.io-client";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Spinner from "../Extras/Spinner";
import AuctionWinner from "../Auctions/AuctionWinner";
import { REACT_APP_API_BASE_URL } from "../../config";
import { hasAuctionEnded } from "../../utils/utilityFunctions";

const Room = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [socket, setSocket] = useState(null);
  const { _id, bids, startTime, endTime } = useSelector(selectAuctionData);

  useEffect(() => {
    const initializeSocket = () => {
      const newSocket = openSocket(REACT_APP_API_BASE_URL);

      newSocket.on("roomUpdate", (data) => {
        if (data.room._id === id) {
          setRoom(data.room);
        }
      });

      return newSocket;
    };

    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`/api/ad/${id}/room`);
        const data = await response.json();
        setRoom(data.room);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room details:", error);
        setLoading(false);
      }
    };

    setSocket(initializeSocket());
    fetchRoomDetails();

    return () => {
      socket && socket.disconnect(); // Disconnect socket when component unmounts
    };
  }, [id]);

  if (loading || !room) {
    return <Spinner />;
  }

  return hasAuctionEnded(endTime) ? (
    <AuctionWinner />
  ) : (
    <Box>
      <AuctionTimer />

      <Typography variant="h2" gutterBottom>
        {room.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {room.description}
      </Typography>

      {/* Bids Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bidder</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {room.bids.map((bid) => (
              <TableRow key={bid._id}>
                <TableCell>{bid.bidder}</TableCell>
                <TableCell align="right">{bid.amount}</TableCell>
                <TableCell align="right">{bid.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Room;
