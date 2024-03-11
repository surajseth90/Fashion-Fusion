import { lazy, useEffect, Suspense, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResponsiveWrapper from "./app/ResponsiveWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  setDimension,
  setSnakeBarContent,
  setProductsArray,
  setProductTypes,
  setLoginedUser,
  setUserData,
} from "./action";
import Home from "./components/Home";
import ProtectedRoute from "./app/ProtectedRouting";
import ProductsJson from "./assets/data/products.json";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { removeToken, setToken } from "./session";
import Blogs from "./components/Blogs";
const UnknownRoute = lazy(() => import("./app/UnknownRoute"));
const Account = lazy(() => import("./components/Account"));
const ProductPage = lazy(() => import("./components/ProductPage"));
const AllProducts = lazy(() => import("./components/AllProducts"));
const Checkout = lazy(() => import("./components/Checkout"));
const Contact = lazy(() => import("./components/Contact"));


export const Fallback = () => {
  return (
    <>
      <main className="full-page">
        <div className="loader"></div>
      </main>
    </>
  );
};

function App() {
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const [isOverlay, snakeBarContent] = useSelector((state) => [
    state.isOverlay,
    state.snakeBarContent,
  ]);

  const snakeBarTimeoutRef = useRef(null);

  useEffect(() => {
    const userSub = onAuthStateChanged(auth, (user) => {
      dispatch(setLoginedUser(user));
      setUserId(user);
      if (user === null) {
        removeToken();
      } else {
        setToken(user.uid);
      }
    });

    return () => {
      userSub();
    };
  }, []);

  useEffect(() => {
    if (userId !== null) {
      const userData = onSnapshot(doc(db, "USER_DATA", userId.uid), (doc) => {
        if (doc.data() === undefined) {
          addUserData(userId.uid);
        }
        doc.exists() && dispatch(setUserData(doc.data()));
      });

      return () => {
        userData();
      };
    }
  }, [userId]);

  useEffect(() => {
    dispatch(setProductsArray(ProductsJson.products));
    let arr = [];
    ProductsJson.products.forEach((element) => {
      arr.push(element.product_type);
    });
    dispatch(setProductTypes(Array.from(new Set(arr))));
  }, []);

  useEffect(() => {
    if (snakeBarContent !== "") {
      clearTimeout(snakeBarTimeoutRef.current);
      snakeBarTimeoutRef.current = setTimeout(() => {
        dispatch(setSnakeBarContent(""));
      }, 2000);
    }
  }, [snakeBarContent]);

  const addUserData = async (uid) => {
    await setDoc(doc(db, "USER_DATA", uid), {
      addresses: [],
      wishlist: [],
      cart: [],
      orders: [],
    });
  };

  const onResize = (data) => {
    dispatch(setDimension(data));
  };

  return (
    <div className="app">
      <ResponsiveWrapper
        breakpoints={{
          small: [0, 639],
          medium: [640, 1023],
          large: [1024, "~"],
        }}
        onResize={onResize}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="*"
              element={
                <Suspense fallback={<Fallback />}>
                  <UnknownRoute />
                </Suspense>
              }
            />
            <Route
              path="/product/:id"
              element={
                <Suspense fallback={<Fallback />}>
                  <ProductPage />
                </Suspense>
              }
            />

            <Route
              path="/all-products"
              element={
                <Suspense fallback={<Fallback />}>
                  <AllProducts />
                </Suspense>
              }
            />

            <Route
              path="/all-products/:category"
              element={
                <Suspense fallback={<Fallback />}>
                  <AllProducts />
                </Suspense>
              }
            />
            <Route
              path="/account"
              element={
                <Suspense fallback={<Fallback />}>
                  <Account />
                </Suspense>
              }
            />

            <Route
              path="/blogs"
              element={
                <Suspense fallback={<Fallback />}>
                  <Blogs />
                </Suspense>
              }
            />

            <Route
              path="/checkout"
              element={
                <Suspense fallback={<Fallback />}>
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              path="/contact"
              element={
                <Suspense fallback={<Fallback />}>
                  <Contact />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </ResponsiveWrapper>
      {isOverlay && <div className="overlay"></div>}
      {/* {isLoginPopupOpened && (
        <Suspense fallback={<Fallback />}>
          <LoginPopup />
        </Suspense>
      )} */}

      <div
        className={`snack-bar-wrapper ${
          snakeBarContent !== "" ? "snack-bar-visible" : ""
        }`}
      >
        <p className="font-bold font-14 text-white">
          {snakeBarContent || "You are required to Login first"}
        </p>
        <button
          className="ms-4 me-2 position-relative"
          onClick={() => dispatch(setSnakeBarContent(""))}
        >
          <div className="snackbar-cross snackbar-cross-1"></div>
          <div className="snackbar-cross snackbar-cross-2"></div>
        </button>
      </div>
    </div>
  );
}

export default App;
