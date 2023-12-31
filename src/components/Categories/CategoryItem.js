// CategoryItem.js
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./CategoryItem.css"; // Import the CSS file

const CategoryItem = ({ item }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="category-container">
      <div className="category-item" onClick={handleOpenModal}>
        <img className="category-image" src={item.img} alt={item.title} />
        <div className="category-info">
          <h1 className="category-title">{item.title}</h1>
          <button className="category-button">EXPLORE</button>
        </div>
      </div>

      {/* Categories Modal */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="div">
            {item.title} Categories
          </Typography>
          {/* Add your category options or content here */}
          <div>
            <p>Subcategory 1</p>
            <p>Subcategory 2</p>
            {/* Add more subcategories as needed */}
          </div>
          <div style={{ marginTop: "16px" }}>
            <Button
              onClick={handleCloseModal}
              variant="contained"
              color="primary"
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CategoryItem;
