import React from "react";
import "../css/footer.css";

import "font-awesome/css/font-awesome.min.css";

const Footer = () => {
  return (
    <>
      <div className="footercls">
        <footer id="footer">
          <div className="container py-4">
            <div className="copyright">
              &copy; Copyright{" "}
              <strong>
                <span>Live Auctions</span>
              </strong>
              . All Rights Reserved
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
