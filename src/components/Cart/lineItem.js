import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function LineItem({
  product,
  variantIndex,
  quantity,
  index,
  userData,
  loginedUser,
}) {
  const [loading, setLoading] = useState(false);

  const updateQuantity = (action) => {
    setLoading(true);
    const updatedCart = [...userData.cart];
    if (action === "add") {
      updatedCart[index].quantity++;
    } else {
      updatedCart[index].quantity--;
    }
    updateCart(updatedCart);
  };

  const deleteItemHandler = () => {
    setLoading(true);
    const updatedCart = [...userData.cart];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
  };

  const updateCart = async (data) => {
    try {
      await updateDoc(doc(db, "USER_DATA", loginedUser.uid), {
        cart: data,
      });
      setLoading(false);
    } catch (error) {
      console.log("Error uadting the quantity : ", error);
    }
  };

  return (
    <div className="line-item-card d-flex px-3 py-4 position-relative">
      {loading && (
        <>
          <div className="line-item-overlay"></div>
          <div className="btn-loader-white position-absolute start-50 top-50"></div>
        </>
      )}
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

        <div className="quantity-wrapper bg-grey text-orange mt-2">
          <button
            disabled={quantity === 1 || loading}
            onClick={() => updateQuantity("minus")}
            className="text-orange px-3 py-2 font-bolder font-18"
          >
            -
          </button>
          <span className="font-14 font-bold">{quantity}</span>

          <button
            disabled={loading}
            onClick={() => updateQuantity("add")}
            className="text-orange px-3 py-2 font-bolder font-18"
          >
            +
          </button>
        </div>
      </div>
      <button
        disabled={loading}
        title="remove"
        className="text-orange position-absolute remove-btn"
        onClick={deleteItemHandler}
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
