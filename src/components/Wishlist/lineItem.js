import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import React, { useState } from "react";

export default function LineItem({
  product,
  variantIndex,
  userData,
  loginedUser,
  index,
  variantId,
}) {
  const [loading, setLoading] = useState(false);

  const deleteClickHandler = async () => {
    setLoading(true);
    const data = [...userData.wishlist];
    data.splice(index, 1);
    try {
      await updateDoc(doc(db, "USER_DATA", loginedUser.uid), {
        wishlist: data,
      });
      setLoading(false);
    } catch (error) {
      console.log("Error uadting the quantity : ", error);
    }
  };

  const moveToWishlistHandler = async () => {
    setLoading(true);

    const wishlistData = [...userData.wishlist];
    wishlistData.splice(index, 1);

    const cartData = [...userData.cart];
    let cartIndex = cartData.findIndex((item) => item.variantId === variantId);
    if (cartIndex >= 0) {
      cartData[cartIndex].quantity++;
    } else {
      let obj = {
        variantId,
        product,
        variantIndex,
        quantity: 1,
      };
      cartData.push(obj);
    }

    try {
      await updateDoc(doc(db, "USER_DATA", loginedUser.uid), {
        wishlist: wishlistData,
        cart: cartData,
      });
      setLoading(false);
    } catch (error) {
      console.log("error while moving product into cart : ", error);
    }
  };

  return (
    <div className="line-item-card d-flex px-3 py-4 position-relative">
      <img
        className="line-item-img w-25"
        src={product.variants[variantIndex].featured_image.src}
        alt=""
      />
      <div className="line-item-details ms-2">
        <h3 className="font-14 m-0 text-capitalize me-3">{product.title}</h3>
        <p className="font-12 font-bold mt-1">
          ${product.variants[variantIndex].price}
        </p>

        <p className="font-12 text-capitalize">
          Variant :{" "}
          {`${
            product.variants.length === 1
              ? "Default"
              : `${product.variants[variantIndex].option1}/ ${product.variants[variantIndex].option2}`
          }`}
        </p>

        <div className="mt-2">
          <button
            className="px-2 py-1 btn-orange font-12"
            disabled={loading}
            onClick={moveToWishlistHandler}
          >
            MOVE TO CART
          </button>
        </div>
      </div>
      <button
        title="remove"
        className="text-orange position-absolute remove-btn"
        disabled={loading}
        onClick={deleteClickHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="16"
          height="16"
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
  );
}
