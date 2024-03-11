import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import FBIcon from "../../assets/images/facebook.png";
import InstaIcon from "../../assets/images/instagram.png";
import LinkedInIcon from "../../assets/images/linkedin.png";
import Logo from "../../assets/images/logo.jpeg";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <div className="footer-container bg-dark">
      <div className="container d-flex justify-content-center">
        <div className="d-flex w-75 justify-content-around footer-row">
          <div 
          className="footer-items footer-copyright"
          >
            <div className="d-flex justify-content-center ">
              <img className="w-25" src={Logo} alt="Logo" />
            </div>
            <div className="d-flex justify-content-center mt-3">
              <a
                className="mx-2"
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={FBIcon}></img>
              </a>
              <a
                className="mx-2"
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={LinkedInIcon}></img>
              </a>
              <a
                className="mx-2"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={InstaIcon}></img>
              </a>
            </div>
            <span className="mt-3 text-center">
              Copyright © 2020 Fashion Fusion <br />
              All rights reserved.
            </span>
          </div>

          <div 
          className="footer-items footer-useful-links align-items-center"
          >
            <label>Useful Links</label>
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/account")}>Account</button>
            <button onClick={() => navigate("/all-products")}>Shop</button>
            <button onClick={() => navigate("/contact")}>Contact Us</button>
            <button onClick={()=>navigate("/blogs")}>Blogs</button>
            {/* <button>Privacy Policy</button> */}
          </div>
          {/* <div className="footer-items footer-services col-md-2 col-6 col-lg-3 mb-3">
            <label>Services</label>
            <button onClick={() => navigate("/services/Maid")}>T-Shirt</button>
            <button onClick={() => navigate("/services/Cook")}>Dresses</button>
            <button onClick={() => navigate("/services/Babysitter")}>
              Jackets
            </button>
            <button onClick={() => navigate("/services/Nurse")}>Trouser</button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
