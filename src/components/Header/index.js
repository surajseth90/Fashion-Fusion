import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { setIsOverlay, setCartDrawer, setWishlistDrawer } from "../../action";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { removeToken } from "../../session";
import Logo from "../../assets/images/logo.jpeg";
import Cart from "../Cart";
import Wishlist from "../Wishlist";

export default function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const headerRightContainerRef = useRef(null);

  const [userData, loginedUser] = useSelector((state) => [
    state.userData,
    state.loginedUser,
  ]);

  useEffect(() => {
    dispatch(setIsOverlay(false));
    document.body.style.overflowY = "auto";
    headerRightContainerRef.current.classList.remove("show");
  }, [location.pathname]);

  return (
    <>
      <div className="header-container">
        <div className="container">
          <nav className="header d-flex navbar-light position-relative">
            <div className="header-left-container">
              <Link to={"/"}>
                <div className="header-logo">
                  <img src={Logo} alt="Fashion Fusion" className="header-logo"/>
                </div>
              </Link>
            </div>
            {/* <button
              className="navbar-toggler"
              id="navbar-toggle"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => {
                const classList = headerRightContainerRef.current.classList;
                if (classList.contains("show")) {
                  classList.remove("show");
                  document.body.style.overflowY = "auto";
                  dispatch(setIsOverlay(false));
                } else {
                  document.body.style.overflowY = "hidden";
                  dispatch(setIsOverlay(true));
                  classList.add("show");
                }
              }}
            >
              <span className="navbar-toggler-icon"></span>
            </button> */}
            <div className="header-center-containr d-flex align-items-center">
              {/* <div
                className="mobile-view-close-btn-wrapper"
                style={{ display: "none" }}
              >
                <button
                  className="navbar-toggler"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={() => {
                    const classList = headerRightContainerRef.current.classList;
                    if (classList.contains("show")) {
                      classList.remove("show");
                      dispatch(setIsOverlay(false));
                      document.body.style.overflowY = "auto";
                    } else {
                      document.body.style.overflowY = "hidden";
                      classList.add("show");
                      dispatch(setIsOverlay(true));
                    }
                  }}
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div> */}
              <ul className="header-navbar d-flex m-0">

              <li className="header-li">
                  <Link to={"/"}>
                    <span className="navbar-li-label font-18">Home</span>
                  </Link>
                </li>
                <li className="header-li">
                  <Link to={"/all-products"}>
                    <span className="navbar-li-label font-18">Shop</span>
                  </Link>
                </li>

                <li className="header-li">
                  <Link to="/contact">
                    <span className="navbar-li-label font-18">Contact</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div
              className="header-right-container d-flex align-items-center"
              ref={headerRightContainerRef}
            >
              <button
                className="mx-2 position-relative"
                onClick={() => dispatch(setWishlistDrawer(true))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 26 24"
                  fill="none"
                >
                  <path
                    d="M7.16668 1.5C3.94551 1.5 1.33334 4.08533 1.33334 7.275C1.33334 9.84983 2.35418 15.9608 12.4027 22.1383C12.5827 22.2479 12.7893 22.3058 13 22.3058C13.2107 22.3058 13.4173 22.2479 13.5973 22.1383C23.6458 15.9608 24.6667 9.84983 24.6667 7.275C24.6667 4.08533 22.0545 1.5 18.8333 1.5C15.6122 1.5 13 5 13 5C13 5 10.3878 1.5 7.16668 1.5Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="position-absolute quantity-indicator text-white d-flex justify-content-center align-items-center rounded-circle font-12">
                  <span>
                  {userData?.wishlist?.length || 0}
                  </span>
                </div>
              </button>
              <button
                className="mx-2 position-relative"
                onClick={() => dispatch(setCartDrawer(true))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_3_58)">
                    <g clipPath="url(#clip1_3_58)">
                      <path d="M24 0H0V24H24V0Z" fill="white" />
                      <path
                        d="M5.14002 18.9335L5.93558 7H18.0644L18.86 18.9335C18.8985 19.5107 18.4407 20 17.8622 20H6.1378C5.55934 20 5.10154 19.5107 5.14002 18.9335Z"
                        stroke="#15151F"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M9 10V6.11111C9 4.39289 10.3431 3 12 3C13.6569 3 15 4.39289 15 6.11111V10"
                        stroke="#15151F"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_3_58">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                    <clipPath id="clip1_3_58">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <div className="position-absolute quantity-indicator rounded-circle font-12 text-white d-flex justify-content-center align-items-center">
                  <span>
                  {userData?.cart?.length || 0}
                  </span>
                </div>
              </button>
              <Link to="/account" className="mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect width="24" height="24" fill="white" />
                  <g clipPath="url(#clip0_3_63)">
                    <g clipPath="url(#clip1_3_63)">
                      <path d="M0 0H24V24H0V0Z" fill="white" />
                      <path
                        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                        stroke="#15151F"
                        strokeWidth="1.5"
                      />
                      <mask
                        id="mask0_3_63"
                        maskUnits="userSpaceOnUse"
                        x="3"
                        y="13"
                        width="19"
                        height="8"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.532 21C20.5973 21.001 20.6622 20.9887 20.7226 20.9637C20.783 20.9388 20.8377 20.9018 20.8833 20.855C20.9289 20.8082 20.9644 20.7525 20.9878 20.6915C21.0111 20.6305 21.0217 20.5653 21.019 20.5C20.799 16.314 17.799 13 12.016 13C6.23299 13 3.23299 16.314 3.01299 20.5C3.01026 20.5653 3.02089 20.6305 3.04423 20.6915C3.06757 20.7525 3.10313 20.8082 3.14872 20.855C3.19432 20.9018 3.24899 20.9388 3.30939 20.9637C3.36979 20.9887 3.43465 21.001 3.49999 21H20.532Z"
                          fill="white"
                        />
                      </mask>
                      <g mask="url(#mask0_3_63)">
                        <path
                          d="M21.0202 20.5L23.0162 20.395L21.0192 20.5H21.0202ZM12.0152 15C14.5212 15 16.2052 15.712 17.2642 16.666C18.3232 17.62 18.9352 18.97 19.0212 20.605L23.0152 20.395C22.8812 17.845 21.8852 15.446 19.9412 13.695C17.9972 11.944 15.2922 11 12.0162 11L12.0152 15ZM5.01024 20.605C5.09624 18.97 5.71024 17.618 6.76724 16.666C7.82424 15.714 9.50924 15 12.0152 15L12.0162 11C8.74024 11 6.03224 11.945 4.09024 13.694C2.14824 15.443 1.15024 17.844 1.01624 20.394L5.01024 20.605ZM3.50024 23H20.5322V19H3.50024V23ZM1.01624 20.395C0.937241 21.883 2.14624 23 3.50024 23V19C3.70637 19.001 3.91013 19.044 4.09913 19.1262C4.28814 19.2085 4.45844 19.3283 4.59969 19.4784C4.74093 19.6286 4.85016 19.8059 4.92074 19.9995C4.99132 20.1932 5.02177 20.3992 5.01024 20.605L1.01624 20.395ZM19.0212 20.605C19.0097 20.3992 19.0412 20.1932 19.1117 19.9995C19.1823 19.8059 19.2916 19.6286 19.4328 19.4784C19.574 19.3283 19.7443 19.2085 19.9333 19.1262C20.1224 19.044 20.3261 19.001 20.5322 19V23C21.8852 23 23.0952 21.883 23.0162 20.395L19.0212 20.605Z"
                          fill="#15151F"
                        />
                      </g>
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_3_63">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                    <clipPath id="clip1_3_63">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </div>
          </nav>
        </div>
      </div>
      <Wishlist />
      <Cart />
    </>
  );
}
