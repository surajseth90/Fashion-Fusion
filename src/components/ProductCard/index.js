import { Link } from "react-router-dom";
import "./style.scss";
import { useState } from "react";
import { updateDoc, arrayUnion, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  setCartDrawer,
  setSnakeBarContent,
  setWishlistDrawer,
} from "../../action";

export default function ProductCard({ product }) {
  const [selectedVariant, setSelectedVariant] = useState({});
  const [isLoading, setLoading] = useState(false);

  const [loginedUser, userData] = useSelector((state) => [
    state.loginedUser,
    state.userData,
  ]);

  const dispatch = useDispatch();

  const renderColorAndSizes = () => {
    if (product.variants.length > 1) {
      let colorsArr = [];
      let sizeArr = [];
      product.variants.forEach((variant) => {
        if (!colorsArr.includes(variant.option1))
          colorsArr.push(variant.option1);
        if (!sizeArr.includes(variant.option2)) sizeArr.push(variant.option2);
      });

      return (
        <>
          <div className="product-option-wrapper d-flex gap-1 py-2">
            {colorsArr.map((color) => {
              return (
                <button
                  key={`product-color-${color}-${product.id}`}
                  className={`rounded-circle option color-option ${
                    selectedVariant?.color === color ? "selected" : ""
                  }`}
                  style={{ background: color }}
                  onClick={(e) => variantSelectionHandler(e, color, "color")}
                ></button>
              );
            })}
          </div>

          <div className="product-option-wrapper d-flex gap-1 py-2">
            {sizeArr.map((size) => {
              return (
                <button
                  key={`product-size-${size}-${product.id}`}
                  className={`size-option option font-12 d-flex align-items-center justify-content-center ${
                    selectedVariant?.size === size ? "bg-dark text-white" : ""
                  }`}
                  onClick={(e) => variantSelectionHandler(e, size, "size")}
                >
                  <span>{size}</span>
                </button>
              );
            })}
          </div>
        </>
      );
    }
  };

  const variantSelectionHandler = (e, value, type) => {
    e.stopPropagation();
    e.preventDefault();
    let obj = { ...selectedVariant };
    obj = { ...obj, [type]: value };
    let variantId = null;
    if (obj?.color !== undefined && obj?.size !== undefined) {
      product.variants.filter((variant, key) => {
        if (variant.option1 === obj.color && variant.option2 === obj.size) {
          variantId = key;
          return variant;
        }
      });
      obj = { ...obj, variantId: variantId };
    }

    setSelectedVariant(obj);
  };

  const addToCartHandler = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (loginedUser === null) {
      dispatch(setSnakeBarContent("Please Login To Update the Cart"));
      return;
    }
    setLoading(true);
    const checkVariant = userData.cart.findIndex(
      (item) =>
        item.variantId === product.variants[selectedVariant?.variantId || 0].id
    );

    try {
      if (checkVariant !== -1) {
        const updatedCart = [...userData.cart];
        updatedCart[checkVariant].quantity++;
        await updateDoc(doc(db, "USER_DATA", loginedUser.uid), {
          cart: updatedCart,
        });
      } else {
        await updateDoc(doc(db, "USER_DATA", loginedUser.uid), {
          cart: arrayUnion({
            product,
            variantIndex: selectedVariant?.variantId || 0,
            variantId: product.variants[selectedVariant?.variantId || 0].id,
            quantity: 1,
          }),
        });
      }

      setLoading(false);
      dispatch(setSnakeBarContent("PRODUCT ADDED TO CART"));
      setTimeout(() => {
        dispatch(setCartDrawer(true));
      }, 1000);
    } catch (error) {
      console.log("Err while updating the cart : ", error);
    }
  };
  const wishlistAddHandler = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (loginedUser === null) {
      dispatch(setSnakeBarContent("Please Login To Update the Cart"));
      return;
    }

    const checkVariant = userData.wishlist.findIndex(
      (item) =>
        item.variantId === product.variants[selectedVariant?.variantId || 0].id
    );

    if (checkVariant !== -1) {
      dispatch(setSnakeBarContent("PRODUCT IS ALREADY IN WISHLISY"));
      setTimeout(() => {
        dispatch(setWishlistDrawer(true));
      }, 1000);
    } else {
      try {
        await updateDoc(doc(db, "USER_DATA", loginedUser.uid), {
          wishlist: arrayUnion({
            product,
            variantIndex: selectedVariant?.variantId || 0,
            variantId: product.variants[selectedVariant?.variantId || 0].id,
          }),
        });

        dispatch(setSnakeBarContent("PRODUCT ADDED TO WISHLIST"));
        setTimeout(() => {
          dispatch(setWishlistDrawer(true));
        }, 1000);
      } catch (error) {
        console.log("Err while updating the cart : ", error);
      }
    }
  };

  return (
    <div className="product-card py-2 px-2 position-relative">
      <button
        className="position-absolute wishlist-btn text-orange"
        style={{ right: 8 }}
        onClick={wishlistAddHandler}
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
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      <Link to={`/product/${product.id}`} className="product-link d-block overflow-hidden">
        <div className="d-block overflow-hidden">
        <img
          className="product-img w-100"
          src={product.variants[selectedVariant?.variantId || 0].featured_image.src}
          alt={product.title}
        />
        </div>
     
        <p className="text-dark font-14 mt-3 font-bold">{product.title}</p>
      </Link>
      <p className="font-14 text-dark">${product?.variants[selectedVariant?.variantId || 0]?.price}</p>
      {renderColorAndSizes()}
      <button
        onClick={addToCartHandler}
        className="font-14 add-to-cart-btn w-100 btn-orange mt-2 d-flex justify-content-center align-items-center"
        disabled={
          (product.variants.length > 1 &&
            (selectedVariant?.variantId === undefined ||
              selectedVariant?.variantId === null)) ||
          isLoading
        }
        style={{padding:8}}
      >
        {isLoading ? (
          <div className="btn-loader-white"></div>
        ) : product.variants.length > 1 &&
          selectedVariant?.variantId === null ? (
          "OUT OF STOCK"
        ) : (
          "ADD TO CART"
        )}
      </button>
    </div>
  );
}
