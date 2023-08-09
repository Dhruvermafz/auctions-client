import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import openSocket from "socket.io-client";
import { Box, Typography } from "@mui/material";
import Spinner from "../Extras/Spinner";

const Room = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_API_BASE_URL);

    // Function to fetch the room details using the ad ID
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

    // Event listener for room updates
    socket.on("roomUpdate", (data) => {
      if (data.room._id === id) {
        setRoom(data.room);
      }
    });

    // Fetch room details when the component mounts
    fetchRoomDetails();

    // Clean up the socket event listener when the component unmounts
    return () => {
      socket.off("roomUpdate");
    };
  }, [id]);

  if (loading || !room) {
    return <Spinner />;
  }

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        {room.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {room.description}
      </Typography>
      {/* You can add more ad details using Typography or other MUI components */}
    </Box>
  );
};

export default Room;
