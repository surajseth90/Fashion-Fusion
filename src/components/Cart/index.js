import "../../drawer.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCartDrawer, setIsOverlay } from "../../action";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import LineItem from "./lineItem";

export default function Cart() {
  const [cartDrawer, userData, loginedUser] = useSelector((state) => [
    state.cartDrawer,
    state.userData,
    state.loginedUser,
  ]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartDrawer) {
      document.body.style.overflowY = "hidden";
      dispatch(setIsOverlay(true));
    } else {
      dispatch(setIsOverlay(false));
      document.body.style.overflowY = "auto";
    }
  }, [cartDrawer]);

  const checkoutClickHandler = () => {
    dispatch(setCartDrawer(false));
    navigate("/checkout");
  };

  const getTotalCartValue = () => {
    let total = 0;
    if (userData?.cart?.length > 0)
      userData.cart.forEach((data) => {
        total +=
          +data.product.variants[data.variantIndex].price * data.quantity;
      });

    return total;
  };

  return (
    <div
      className={`drawer-container overflow-hidden position-fixed end-0 top-0 h-100 bg-white ${
        cartDrawer ? "visible" : ""
      }`}
    >
      {loginedUser !== null ? (
        <div className="aside-container position-relative">
          <div className="aside-top d-flex align-items-center justify-content-between py-3 px-3">
            <div className="d-flex align-items-center">
              <h3 className="m-0 font-bold text-orange">CART</h3>
              <p className="ms-2 font-14 text-orange">{`(${
                userData?.cart?.length || 0
              } ITEMS)`}</p>
            </div>
            <button
              title="close"
              className="text-orange"
              onClick={() => {
                dispatch(setCartDrawer(false));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="24"
                height="24"
                viewBox="0 0 64 64"
              >
                <g>
                  <path
                    d="M4.59 59.41a2 2 0 0 0 2.83 0L32 34.83l24.59 24.58a2 2 0 0 0 2.83-2.83L34.83 32 59.41 7.41a2 2 0 0 0-2.83-2.83L32 29.17 7.41 4.59a2 2 0 0 0-2.82 2.82L29.17 32 4.59 56.59a2 2 0 0 0 0 2.82z"
                    fill="currentColor"
                    opacity="1"
                  ></path>
                </g>
              </svg>
            </button>
          </div>

          <div className="aside-main overflow-auto h-75 pb-4">
            {userData?.cart?.length > 0 ? (
              <>
                <div className="line-items-wrrapper">
                  {userData.cart.map(
                    ({ product, variantIndex, variantId, quantity }, key) => {
                      return (
                        <div key={`cart-item-${variantId}`}>
                          <LineItem
                            product={product}
                            variantIndex={variantIndex}
                            variantId={variantId}
                            quantity={quantity}
                            index={key}
                            userData={userData}
                            loginedUser={loginedUser}
                          />
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="aside-bottom position-absolute bottom-0 px-3 py-4 w-100">
                  <div className="aside-bottom-top d-flex justify-content-between">
                    <p className="font-bold font-18">SUBTOTAL</p>
                    <p className="font-bold font-18">
                      ${getTotalCartValue()}
                    </p>
                  </div>

                  <div>
                    <button
                      className="w-100 btn btn-orange py-2 mt-2"
                      onClick={checkoutClickHandler}
                    >
                      CHECKOUT
                    </button>
                  </div>

                  <div className=" text-center mt-2">
                    <span className="font-12 ">
                      Shipping &amp; taxes are calculated during checkout.
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-100 h-100 d-flex flex-column px-4 justify-content-center align-items-center">
                <h4>YOUR CART IS EMPTY</h4>
                <Link
                  className="btn btn-dark mt-3"
                  to={"/all-products"}
                  onClick={() => {
                    dispatch(setCartDrawer(false));
                  }}
                >
                  SHOP NOW
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="aside-container position-relative d-flex justify-content-center align-items-center flex-column">
          <button
            title="close"
            className="text-orange position-absolute"
            onClick={() => {
              dispatch(setCartDrawer(false));
            }}
            style={{ top: 10, right: 10 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="24"
              height="24"
              viewBox="0 0 64 64"
            >
              <g>
                <path
                  d="M4.59 59.41a2 2 0 0 0 2.83 0L32 34.83l24.59 24.58a2 2 0 0 0 2.83-2.83L34.83 32 59.41 7.41a2 2 0 0 0-2.83-2.83L32 29.17 7.41 4.59a2 2 0 0 0-2.82 2.82L29.17 32 4.59 56.59a2 2 0 0 0 0 2.82z"
                  fill="currentColor"
                  opacity="1"
                ></path>
              </g>
            </svg>
          </button>
          <h2 className="text-orange">Please Sign In First</h2>
          <Link
            to={"/account"}
            onClick={() => {
              dispatch(setCartDrawer(false));
            }}
            className="btn-orange font-18 mt-2 px-5 text-decoration-none"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
