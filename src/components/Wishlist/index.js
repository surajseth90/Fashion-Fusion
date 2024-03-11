import "../../drawer.scss";
import { useDispatch, useSelector } from "react-redux";
import { setWishlistDrawer, setIsOverlay } from "../../action";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import LineItem from "./lineItem";

export default function Wishlist() {
  const [wishlistDrawer, userData, loginedUser] = useSelector((state) => [
    state.wishlistDrawer,
    state.userData,
    state.loginedUser,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlistDrawer) {
      document.body.style.overflowY = "hidden";
      dispatch(setIsOverlay(true));
    } else {
      dispatch(setIsOverlay(false));
      document.body.style.overflowY = "auto";
    }
  }, [wishlistDrawer]);

  return (
    <div
      className={`drawer-container overflow-hidden position-fixed end-0 top-0 h-100 bg-white ${
        wishlistDrawer ? "visible" : ""
      }`}
    >
      {loginedUser !== null ? (
        <div className="aside-container position-relative">
          <div className="aside-top d-flex align-items-center justify-content-between py-3 px-3">
            <div className="d-flex align-items-center">
              <h3 className="m-0 font-bold text-orange">WISHLIST</h3>
              <p className="ms-2 font-14 text-orange">{`(${
                userData?.wishlist?.length || 0
              } ITEMS)`}</p>
            </div>
            <button
              title="close"
              className="text-orange"
              onClick={() => {
                dispatch(setWishlistDrawer(false));
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

          <div className="aside-main overflow-auto" style={{ height: "92%" }}>
            {userData?.wishlist?.length > 0 ? (
              <div className="line-items-wrrapper">
                {userData.wishlist.map(
                  ({ product, variantIndex, variantId },index) => {
                    return (
                      <div key={`cart-item-${variantId}`}>
                        <LineItem
                          product={product}
                          variantIndex={variantIndex}
                          userData={userData}
                          loginedUser={loginedUser}
                          variantId={variantId}
                          index={index}
                        />
                      </div>
                    );
                  }
                )}
              </div>
            ) : (
              <div className="w-100 h-100 d-flex flex-column px-4 justify-content-center align-items-center">
                <h4>YOUR WISHLIST IS EMPTY</h4>
                <Link
                  className="btn btn-dark mt-3"
                  to={"/all-products"}
                  onClick={() => {
                    dispatch(setWishlistDrawer(false));
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
              dispatch(setWishlistDrawer(false));
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
              dispatch(setWishlistDrawer(false));
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
