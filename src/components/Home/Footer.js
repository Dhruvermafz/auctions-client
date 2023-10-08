import React, { useEffect, useState } from "react";
import "../css/footer.css";
import { NavLink, useNavigate } from "react-router-dom";

import { AiOutlineRight, AiFillTwitterCircle } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";

import { FiTwitter, FiFacebook, FiInstagram, FiMail } from "react-icons/fi";
// import {BsFacebook} from 'react-icons/bs';
// import {FaInstagramSquare} from 'react-icons/fa';
// import {CgMail} from 'react-icons/cg';

import "font-awesome/css/font-awesome.min.css";

const Footer = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [showButton, setShowButton] = useState(true);
  const history = useNavigate();
  const userContact = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data);
      setUserData({ ...userData, name: data.name, email: data.email });
      // console.log(`data send to backend`);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };
  /*  USEEFFECT HOOK -> RUN ONLY ONE TIME WHEN FUNCTION IS CALLED -> ARRAY DENOTES -> NO OF TYMS USEEFFECT CALLLS -> callProfilePage is async function -> so we can not use it inside useEffect */

  useEffect(() => {
    userContact();
  }, []);

  const newsLetterSubmitHandler = () => {
    console.log("Handler called");
    history.push("/");
    setShowButton(false);
  };

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
