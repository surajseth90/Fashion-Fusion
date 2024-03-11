import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { setUserData, setIsOverlay } from "../../action";
import DeleteImg from "../../assets/images/trash.png";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import AddressPopup from "../AddressPopup";
import OrderPopup from "./OrderPopup";

export default function ManageAccount({ loginedUser, userData }) {
  const [loading, setLoading] = useState(false);
  const [isAddressPopupOpened, setIsAddressPopupOpened] = useState(false);
  const [selectedOrderData, setSelectedOrderData] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAddressPopupOpened) {
      dispatch(setIsOverlay(true));
      document.body.style.overflow = "hidden";
    } else {
      dispatch(setIsOverlay(false));
      document.body.style.overflow = "auto";
    }
  }, [isAddressPopupOpened]);

  const logoutHandler = () => {
    setLoading(true);
    setTimeout(() => {
      signOut(auth);
      setLoading(false);
      dispatch(setUserData({}));
    }, 500);
  };

  const addressDeleteHandler = async (key) => {
    const data = [...userData.addresses];
    data.splice(key, 1);
    try {
      await updateDoc(doc(db, "USER_DATA", loginedUser.uid), {
        addresses: data,
      });
    } catch (error) {
      console.log("Error Deleting the Address : ", error);
    }
  };

  return (
    <main className="account-details-main">
      <div className="container">
        <div className="user-details-wrapper text-center">
          <h4>{loginedUser?.displayName}</h4>
          <p className="font-14 text-grey">{loginedUser?.email}</p>
          <div className="w-100 d-flex justify-content-center">
            <button
              onClick={logoutHandler}
              className="px-5 py-2 btn-orange mt-3 d-flex justify-content-center"
            >
              {loading ? <div className="btn-loader-white"></div> : "Logout"}
            </button>
          </div>
        </div>
        <div className="user-order-details-wrapper d-flex justify-content-between my-5 text-center">
          <div className="order-details-wrapper col-lg-7 col-md-7">
            <div className="top-bar p-3 bg-grey font-bold">Order History</div>
            <div className="orders-wrapper mt-4 overflow-auto">
              {userData.orders && userData.orders.length === 0 ? (
                <div>
                  <p className="">You haven't ordered anything!</p>
                  <button
                    className="btn-orange mt-3 text-decoration-none"
                    onClick={() => navigate("/all-products")}
                  >
                    Order Now
                  </button>
                </div>
              ) : (
                <table className="w-100">
                  <thead>
                    <tr>
          
                      <th className="py-3 px-2">Date</th>
                      <th className="py-3 px-2">Payment Type</th>
                      <th className="py-3 px-2">Total</th>
                      <th className="py-3 px-2"></th>

                    </tr>
                  </thead>

                  <tbody>
                    {userData?.orders?.map((lineItem) => {
                      return (
                        <tr key={lineItem.orderId}>
                         
                          <td className="py-3 px-2 font-14">
                            {lineItem.date.toDate().toLocaleDateString()}
                          </td>
                          <td className="py-3 px-2 font-14">
                            {lineItem.PaymentMethod}
                          </td>
                          <td className="py-3 px-2 font-14 font-bold">
                            ${lineItem.ammount}
                          </td>
                          <td className="py-3 px-3 font-14">
                            <button
                              onClick={() => setSelectedOrderData(lineItem)}
                              className="w-100 p-2 view-order-btn"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className="address-details-wrapper col-lg-4 col-md-4">
            <div className="top-bar p-3 bg-grey font-bold">Saved Address</div>
            <div className="mt-4">
              {userData.addresses && userData.addresses.length > 0 ? (
                <ul className="m-0 p-0">
                  {userData.addresses.map((address, key) => {
                    return (
                      <li
                        className="list-style-none mt-2 py-2 px-3 position-relative"
                        key={`user-address-${key}`}
                        style={{ border: "1px solid #e6e6e6" }}
                      >
                        <div className="d-flex align-items-start flex-column">
                          <button
                            title="Delete"
                            onClick={() => addressDeleteHandler(key)}
                            className="position-absolute"
                            style={{ right: 10 }}
                          >
                            <img
                              width={15}
                              src={DeleteImg}
                              alt="Delete"
                              aria-hidden
                            />
                          </button>

                          <span className="font-bold">
                            Address Type : {address.addressType}
                          </span>
                          <p className="font-14">Name : {address.name}</p>
                          <span className="text-grey text-start font-12">{`${address.address}, ${address.city}, ${address.pinCode}, ${address.state}`}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>You haven't added any address!</p>
              )}

              <button
                className="btn-orange mt-3 w-100"
                onClick={() => setIsAddressPopupOpened(true)}
              >
                Add New Address
              </button>
            </div>
          </div>
        </div>
      </div>

      {isAddressPopupOpened && (
        <AddressPopup setIsAddressPopupOpen={setIsAddressPopupOpened} />
      )}

      {selectedOrderData !== null && (
        <OrderPopup
          data={selectedOrderData}
          setSelectedOrderData={setSelectedOrderData}
        />
      )}
    </main>
  );
}
