import { useParams } from "react-router-dom";
import "./style.scss";
import Header from "../Header";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import UpsellProducts from "../UpsellProducts";
import Footer from "../Footer";
import { updateDoc, arrayUnion, doc } from "firebase/firestore";
import { db } from "../../firebase";
import {
  setCartDrawer,
  setSnakeBarContent,
  setWishlistDrawer,
} from "../../action";

export default function Home() {
  const [currentProduct, setCurrentProduct] = useState({});
  const [colorVariants, setColorVariants] = useState([]);
  const [sizeVariants, setSizeVariants] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [currentVariant, setCurrentVariant] = useState(0);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [productsArray, loginedUser, userData] = useSelector((state) => [
    state.productsArray,
    state.loginedUser,
    state.userData,
  ]);

  useEffect(() => {
    const product = productsArray.find((p) => p.id == id);
    setQuantity(1);
    if (product.variants.length > 1) {
      let colorArr = [];
      let sizeArr = [];

      product.variants.forEach((variant) => {
        colorArr.push(variant.option1);
        sizeArr.push(variant.option2);
      });
      setSelectedColor(colorArr[0]);
      setSelectedSize(sizeArr[0]);

      setColorVariants(Array.from(new Set(colorArr)));
      setSizeVariants(Array.from(new Set(sizeArr)));
    }
    setCurrentProduct(product);
  }, [id]);

  useEffect(() => {
    currentProduct?.variants?.forEach((variant, key) => {
      let val = variant.title.split(" / ");
      if (val[0] === selectedColor && val[1] === selectedSize) {
        setCurrentVariant(key);
      }
    });
  }, [selectedColor, selectedSize]);

  const addToCartHandler = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (loginedUser === null) {
      dispatch(setSnakeBarContent("Please Login To Update the Cart"));
      return;
    }
    setAddToCartLoading(true);
    setAddToCartLoading(true);
    const checkVariant = userData.cart.findIndex(
      (item) =>
        item.variantId === currentProduct.variants[currentVariant || 0].id
    );

    try {
      if (checkVariant !== -1) {
        const updatedCart = [...userData.cart];
        updatedCart[checkVariant].quantity =
          updatedCart[checkVariant].quantity + quantity;
        await updateDoc(doc(db, "USER_DATA", loginedUser.uid), {
          cart: updatedCart,
        });
      } else {
        await updateDoc(doc(db, "USER_DATA", loginedUser.uid), {
          cart: arrayUnion({
            product: currentProduct,
            variantIndex: currentVariant || 0,
            variantId: currentProduct.variants[currentVariant || 0].id,
            quantity: quantity,
          }),
        });
      }

      setAddToCartLoading(false);
      setAddToCartLoading(false);
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
        item.variantId === currentProduct.variants[currentVariant || 0].id
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
            product: currentProduct,
            variantIndex: currentVariant || 0,
            variantId: currentProduct.variants[currentVariant || 0].id,
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

  const updateQuantity = (action) => {
    let flag = quantity;
    if (action === "add") {
      flag++;
    } else {
      flag--;
    }
    setQuantity(flag);
  };

  return (
    <div className="product-page-container">
      <Header />
      <main className="pb-5">
        <div className="container product-container d-flex">
          {Object.keys(currentProduct).length > 0 && (
            <div className="row w-100 justify-content-between">
              <div
                className="col-lg-5 product-page-left-side d-flex justify-content-center mb-4"
                style={{ height: "max-content" }}
              >
                <img
                  className="product-main-img w-100"
                  src={
                    currentProduct?.variants[currentVariant || 0]
                      ?.featured_image?.src
                  }
                  alt=""
                />
              </div>
              <div className="col-lg-6 product-page-right-side">
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
                <h1 style={{ width: "90%" }}>{currentProduct?.title}</h1>
                <h5 className="text-grey">${currentProduct?.variants[currentVariant || 0]?.price}</h5>
                {currentProduct.variants.length > 1 && (
                  <>
                    <div className="color-options d-flex gap-2">
                      {colorVariants.map((color) => {
                        return (
                          <button
                            className={`color-option rounded-circle my-2 ${
                              selectedColor === color ? "selected" : ""
                            }`}
                            style={{ background: color }}
                            title={color}
                            onClick={() => setSelectedColor(color)}
                            key={color}
                          ></button>
                        );
                      })}
                    </div>

                    <div className="size-options d-flex gap-2 my-2">
                      {sizeVariants.map((size) => {
                        return (
                          <button
                            className={`size-option py-2 ${
                              selectedSize === size ? "selected" : ""
                            }`}
                            onClick={() => setSelectedSize(size)}
                            key={size}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                <div className="quantity-wrapper bg-grey mt-2 d-flex justify-content-between align-items-center">
                  <button
                    disabled={quantity === 1}
                    onClick={() => updateQuantity("minus")}
                    className="px-2 py-2 font-bolder font-18"
                  >
                    -
                  </button>

                  <span className="font-bold">{quantity}</span>
                  <button
                    onClick={() => updateQuantity("add")}
                    className="px-2 py-2 font-bolder font-18"
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn-orange my-4 w-100"
                  onClick={addToCartHandler}
                >
                  ADD TO CART
                </button>
                <div
                  className="description font-14"
                  dangerouslySetInnerHTML={{ __html: currentProduct.body_html }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <UpsellProducts mainProduct={currentProduct} />
      </main>
      <Footer />
    </div>
  );
}
