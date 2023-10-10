import { Link } from "react-router-dom";
import errorImage from "../../assets/images/404.svg";
import "../css/error.css";
const Error = () => {
  return (
    <div className="full-page">
      <div>
        <img src={errorImage} alt="Page not found" />
        <h3>Page not found!</h3>
        <p>
          After searching through all possibilities, we couldn't find the thing
          you're looking for.
        </p>
        <Link to="/">Return to the homepage</Link>
      </div>
    </div>
  );
};

export default Error;
