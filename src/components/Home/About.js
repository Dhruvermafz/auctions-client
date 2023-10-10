import React from "react";
import About3 from "../../images/about3.jpg";
import About1 from "../../images/about1.jpg";
import About4 from "../../images/about4.png";
import "../css/about.css";

const About = () => {
  return (
    <>
      <div className="container-fluid nav_bg abtcls">
        <div className="row">
          <div className="col-10 mx-auto">
            <section id="values" className="values">
              <div className="container" data-aos="fade-up">
                <div className="section-title" data-aos="fade-up">
                  <h2>About Us</h2>
                  <p>Nonprofit Auction Software</p>
                </div>

                <div className="row abtclssection">
                  <div
                    className="col-lg-4"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <div className="box">
                      <img src={About4} className="img-fluid" alt="" />
                      <h3>Mission</h3>
                      <p>
                        Live Auctions in physical mode, is some kind of
                        difficult. People cannot sell product globally. You have
                        to travel to auction place. Through this app, a person
                        with good internet can easily, sell thier product via
                        bidding.
                      </p>
                    </div>
                  </div>

                  <div
                    className="col-lg-4 mt-4 mt-lg-0"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <div className="box">
                      <img src={About3} className="img-fluid" alt="" />
                      <h3>Ease of Use</h3>
                      <p>
                        Result can generated very easily through the website
                        only, without third party interruption.All the sellers
                        and bidders are verified by our system.
                      </p>
                    </div>
                  </div>

                  <div
                    className="col-lg-4 mt-4 mt-lg-0"
                    data-aos="fade-up"
                    data-aos-delay="600"
                  >
                    <div className="box">
                      <img src={About1} className="img-fluid" alt="" />
                      <h3>Mordern Web</h3>
                      <p>
                        Our, Web-app is providing a Filter functionality. A
                        customer or bidder can filter it out by their choices
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/*  End About Section */}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
