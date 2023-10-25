import React from "react";
import "./about.css";
import missionImage from "../../images/about4.png";
import easeOfUseImage from "../../images/about3.jpg";
import modernWebImage from "../../images/about1.jpg";

const About = () => {
  return (
    <>
      <div className="container-fluid nav_bg abtcls">
        <div className="row">
          <div className="col-10 mx-auto">
            <section id="about" className="about">
              <div className="container" data-aos="fade-up">
                <div className="section-title" data-aos="fade-up">
                  <h2>About Us</h2>
                  <p>Nonprofit Auction Software</p>
                </div>

                <div className="row abtclssection">
                  {/* Mission */}
                  <div
                    className="col-lg-4"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <div className="box">
                      <img src={missionImage} className="img-fluid" alt="" />
                      <h3>Mission</h3>
                      <p>
                        Live Auctions in physical mode can be challenging.
                        People cannot sell products globally without traveling
                        to an auction place. With our app, individuals with a
                        good internet connection can easily sell their products
                        via bidding.
                      </p>
                    </div>
                  </div>

                  {/* Ease of Use */}
                  <div
                    className="col-lg-4 mt-4 mt-lg-0"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <div className="box">
                      <img src={easeOfUseImage} className="img-fluid" alt="" />
                      <h3>Ease of Use</h3>
                      <p>
                        Our platform ensures that results can be generated
                        easily through the website, without third-party
                        interruptions. We verify all sellers and bidders in our
                        system to ensure a secure and seamless experience.
                      </p>
                    </div>
                  </div>

                  {/* Modern Web */}
                  <div
                    className="col-lg-4 mt-4 mt-lg-0"
                    data-aos="fade-up"
                    data-aos-delay="600"
                  >
                    <div className="box">
                      <img src={modernWebImage} className="img-fluid" alt="" />
                      <h3>Modern Web</h3>
                      <p>
                        Our web application is designed with a modern approach,
                        providing advanced filter functionality. Customers and
                        bidders can easily find items based on their preferences
                        and choices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* End About Section */}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
