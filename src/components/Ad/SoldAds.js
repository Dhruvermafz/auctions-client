import React from "react";
import Card from "../Dashboard/Card";

const SoldAds = ({ soldAds }) => {
  return (
    <div>
      <h2>Sold Ads</h2>
      {soldAds.map((ad) => (
        <Card key={ad._id} ad={ad} dashCard />
      ))}
    </div>
  );
};

export default SoldAds;
