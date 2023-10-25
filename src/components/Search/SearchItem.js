import Wrapper from "./SearchItem.styled";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/en";
const SearchItem = ({
  auctionItem: {
    name,
    price,
    image,
    location,
    _id,
    auctionType,
    expiringDate,
    user,
  },
}) => {
  const navigate = useNavigate();
  let auctionTypeEN;
  if (auctionType === "advertisement") {
    auctionTypeEN = "Advertisement";
  }
  if (auctionType === "bid") {
    auctionTypeEN = "Bidding";
  }
  if (auctionType === "buyNow") {
    auctionTypeEN = "Buy Now";
  }
  const handleClick = () => {
    navigate(`/offer?name=${name}&code=${_id}`);
  };
  const calculateRating = () => {
    // Your rating calculation logic here
  };
  moment.locale("en");
  moment().format("LTS");
  return (
    <Wrapper auctionType={auctionTypeEN}>
      <div className="wrapper" onClick={handleClick}>
        <div className="item-container">
          <div className="item-image">
            <img
              src={
                image[0]
                  ? image[0].url
                  : "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
              }
              alt=""
            />
          </div>
          <div className="auction-details">
            <div>
              <div className="auction-name">
                <span className="name">{name}</span>
                <p>End of Auction: {moment(expiringDate).fromNow()}</p>
                <span className="seller-name">Seller: {user.nickname}</span>
              </div>
              <div className="price-container">
                <span className="auction-type">{auctionTypeEN}</span>
                {auctionType !== "advertisement" ? (
                  <span className="price">{price.toFixed(2)} USD</span>
                ) : null}{" "}
              </div>
              <div className="city">
                <span>Sosnowiec</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SearchItem;
