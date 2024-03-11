import "./style.scss";
import Header from "../Header";
import Footer from "../Footer";
import BannerImg from "../../assets/images/home-bottom.svg";
import { useEffect, useState } from "react";
import AddressDetails from "./Address/addressDetails";
import PaymentDetails from "./Payment/paymentDetails";
import OrderDetails from "./OrderDetails";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import ThankYou from "../ThankYouPage";

export default function Checkout() {
  const [activeRow, setActiveRow] = useState(null);
  const [completedAction, setCompletedAction] = useState({});
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("CARD");
  const [loading, setLoading] = useState(false);
  const [orderPageNo, setOrderPageNo] = useState(0);

  const [userData, loginedUser] = useSelector((state) => [
    state.userData,
    state.loginedUser,
  ]);

  useEffect(() => {
    setOrderPageNo(0);
    return () => setOrderPageNo(0);
  }, []);

  const getTotalCartValue = () => {
    let total = 0;
    if (userData?.cart?.length > 0)
      userData.cart.forEach((data) => {
        total +=
          +data.product.variants[data.variantIndex].price * data.quantity;
      });

    return total;
  };

  function generateRandomString() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  const taxCalculation = () => {
    let ammount = getTotalCartValue();
    return (ammount * 2) / 100;
  };

  const onCheckoutHandler = async () => {
    setLoading(true);
    const data = [...userData.orders];

    data.push({
      orderId: generateRandomString(),
      order: userData.cart,
      PaymentMethod: selectedPaymentMode,
      address: selectedAddress,
      ammount: Number(taxCalculation() + getTotalCartValue()).toLocaleString(),
      date: new Date(),
    });

    try {
      await updateDoc(doc(db, "USER_DATA", loginedUser.uid), {
        orders: data,
        cart: [],
      });
    } catch (error) {
      console.log("Error on Checking Out : ", error);
    } finally {
      setLoading(false);
      setOrderPageNo(1);
      setTimeout(() => {
        setOrderPageNo(2);
        // navigate("thank-you");
      }, 1000);
    }
  };

  return (
    <div className="checkout-page">
      {orderPageNo === 1 ? (
        <div className="bg-grey full-page flex-column">
          <div className="loader"></div>

          <h3 className="mt-2">Order Processing</h3>
        </div>
      ) : orderPageNo === 2 ? (
        <ThankYou />
      ) : (
        <>
          <Header />
          <section className="banner-img-section position-relative">
            <img className="banner-img" src={BannerImg} alt="shop banner" />
            <h2 className="position-absolute">Checkout</h2>
          </section>
          <main
            className={`checkout-main-container ${
              !userData?.cart?.length > 0 ? "empty" : ""
            }`}
          >
            <div className="container">
              {userData?.cart?.length > 0 ? (
                <div className="checkout-wrapper">
                  <OrderDetails
                    activeRow={activeRow}
                    setActiveRow={setActiveRow}
                    completedAction={completedAction}
                    setCompletedAction={setCompletedAction}
                    userData={userData}
                  />
                  <AddressDetails
                    activeRow={activeRow}
                    setActiveRow={setActiveRow}
                    completedAction={completedAction}
                    setCompletedAction={setCompletedAction}
                    userData={userData}
                    selectedAddress={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                  />
                  <PaymentDetails
                    activeRow={activeRow}
                    setActiveRow={setActiveRow}
                    completedAction={completedAction}
                    setCompletedAction={setCompletedAction}
                    userData={userData}
                    selectedPaymentMode={selectedPaymentMode}
                    setSelectedPaymentMode={setSelectedPaymentMode}
                    onCheckoutHandler={onCheckoutHandler}
                    loading={loading}
                    getTotalCartValue={getTotalCartValue}
                    taxCalculation={taxCalculation}
                  />
                </div>
              ) : (
                <div className="checkout-wrapper d-flex flex-column justify-content-center align-items-center py-5 px-3">
                  <h2>Your Cart Is Empty</h2>
                  <Link to={"/all-products"} className="btn btn-dark mt-2">
                    Shop Now
                  </Link>
                </div>
              )}
            </div>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
