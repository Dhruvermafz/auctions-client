import React, { useState, useEffect } from "react";
import Nav from "../Home/Nav";
import ActiveListings from "../Listings/ActiveListings";
import Footer from "../Home/Footer";
import { useLocation } from "react-router";
import "../css/categoriesListings.css";

const CategoryListings = () => {
  const location = useLocation();
  const [sortOption, setSortOption] = useState("newest");

  const category = location.pathname.split("/")[2];

  useEffect(() => {
    // Fetch or update active listings based on category and sort option
    // Add your logic here
  }, [category, sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="container">
      <Nav />
      <h1 className="title">{category}</h1>

      <div className="filterContainer">
        <div className="filter">
          <span className="filterText">Sort by:</span>

          <select
            className="select"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option className="option" value="newest">
              Newest
            </option>
            <option className="option" value="lowest">
              Lowest bid
            </option>
            <option className="option" value="highest">
              Highest bid
            </option>
          </select>
        </div>
      </div>

      {/* Add loading state here if needed */}
      <ActiveListings category={category} sortOption={sortOption} />

      <Footer />
    </div>
  );
};

export default CategoryListings;
