// Categories.js
import React from "react";
import PropTypes from "prop-types";
import CategoryItem from "./CategoryItem";
import "./categories.css"; // Import your CSS file

const Categories = ({ categories }) => {
  if (!categories || categories.length === 0) {
    // Handle the case where categories are not available
    return <p>No categories available.</p>;
  }

  return (
    <div className="categories-container">
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default Categories;
