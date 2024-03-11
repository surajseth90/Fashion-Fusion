import React, { useState } from "react";
import "./style.scss";
import { States } from "../../data";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { setSnakeBarContent } from "../../action";
import RadioButton from "../../app/RadioButton";
import { v4 as uuidv4 } from "uuid";

export default function AddressPopup(props) {
  const { type, setIsAddressPopupOpen, addressData } = props;

  const [formUserDetailsData, setFormUserDetailsData] = useState({
    nameTitle: addressData?.nameTitle || "Mr.",
    name: addressData?.name || "",
    phoneNumber: addressData?.phoneNumber || "",
    address: addressData?.address || "",
    city: addressData?.address || "",
    pinCode: addressData?.address || "",
    state: addressData?.address || "",
    addressType: addressData?.addressType || "Home",
  });
  const [loading, setLoading] = useState(false);

  const [loginedUser] = useSelector((state) => [state.loginedUser]);

  const dispatch = useDispatch();

  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    setFormUserDetailsData({
      ...formUserDetailsData,
      [name]: value,
    });

    if (name === "pinCode" && value.length === 6) {
      await fetch(`https://api.postalpincode.in/pincode/${value}`)
        .then((res) => res.json())
        .then((res) => {
          if (res[0].Status === "Success") {
            setFormUserDetailsData((prev) => ({
              ...prev,
              state: res[0].PostOffice[0].State.toUpperCase(),
              city: res[0].PostOffice[0].Name,
            }));
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const phoneNumberHandler = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 10) {
      input = input.slice(0, 10);
    }
    setFormUserDetailsData({
      ...formUserDetailsData,
      phoneNumber: input,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateDoc(doc(db, "USER_DATA", loginedUser.uid), {
        addresses: arrayUnion({
          ...formUserDetailsData,
          id: uuidv4(),
        }),
      });
      setLoading(false);
      setIsAddressPopupOpen(false);
    } catch (error) {
      dispatch(setSnakeBarContent("Something Went Wrong"));
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="address-popup-container">
      <div className="address-popup-wrapper">
        <div className="epp-top">
          <span className="font-18 font-bold">
            {/* {type === "new" ? "Add New Address" : "Change Your Address"} */}
            Add New Address
          </span>
          <button
            onClick={() => setIsAddressPopupOpen(false)}
            disabled={loading}
            type="button"
            title="close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
        <form onSubmit={submitHandler}>
          <div className="row mb-3 flex-column user-name-row">
            <label htmlFor="user-name" className="col-sm-2 col-form-label">
              Name
            </label>

            <div className="col-sm-10 w-100 d-flex">
              <select
                onChange={handleInputChange}
                name="nameTitle"
                disabled={loading}
                className="font-14"
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
              </select>
              <input
                type="text"
                className="form-control"
                id="user-name"
                name="name"
                value={formUserDetailsData?.name}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="row mb-3 flex-column">
            <label
              htmlFor="user-phoneNumber"
              className="col-sm-2 col-form-label"
            >
              Phone Number
            </label>
            <div className="col-sm-10 w-100">
              <input
                type="text"
                className="form-control text-grey"
                id="user-phoneNumber"
                name="phoneNumber"
                value={formUserDetailsData?.phoneNumber}
                onChange={phoneNumberHandler}
                required
                disabled={loading}
              />
            </div>
          </div>
          <div className="row mb-3 flex-column">
            <label htmlFor="user-address" className="col-sm-2 col-form-label">
              Address
            </label>
            <div className="col-sm-10 w-100">
              <input
                type="text"
                className="form-control text-grey"
                id="user-address"
                name="address"
                value={formUserDetailsData?.address}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="d-flex mb-3 city-pin-div">
            <div>
              <label htmlFor="user-city" className="col-sm-2 col-form-label">
                City
              </label>
              <div className="col-sm-10 w-100">
                <input
                  type="text"
                  className="form-control text-grey"
                  id="user-city"
                  name="city"
                  value={formUserDetailsData?.city}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="pin-code-div">
              <label htmlFor="user-pinCode" className="col-sm-2 col-form-label">
                Pin Code
              </label>
              <div className="col-sm-10 w-100">
                <input
                  type="text"
                  className="form-control text-grey"
                  id="user-pinCode"
                  name="pinCode"
                  value={formUserDetailsData?.pinCode}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="state" className="col-sm-2 col-form-label">
                State
              </label>
              <div className="col-sm-10 w-100">
                <select
                  className="form-control text-grey"
                  value={formUserDetailsData?.state}
                  onChange={handleInputChange}
                  name="state"
                  id="state"
                  required
                  disabled={loading}
                >
                  <option value={""} defaultValue disabled>
                    Select
                  </option>
                  {States.map(({ state }) => {
                    return (
                      <option value={state} key={state}>
                        {state}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          <fieldset className="row mb-5 mt-4 flex-column">
            <div className="col-sm-10 d-flex">
              <div className="">
                <RadioButton
                  classes="-input"
                  name="addressType"
                  id="type-home"
                  value="Home"
                  label="Home"
                  onChange={handleInputChange}
                  defaultChecked
                />
              </div>
              <div className="form-check ms-5">
                <RadioButton
                  classes="form-check-input"
                  name="addressType"
                  id="type-office"
                  value="Office"
                  label="Office"
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-check ms-5">
                <RadioButton
                  classes="form-check-input"
                  name="addressType"
                  id="type-other"
                  value="Other"
                  label="Other"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
            className="btn-orange w-100 d-flex justify-content-center"
            disabled={loading}
          >
            {loading ? (
              <div className="btn-loader-white"></div>
            ) : (
              `Save Changes`
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
