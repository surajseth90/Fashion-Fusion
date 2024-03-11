import React, { useEffect, useState } from "react";
import AddressPopup from "../../AddressPopup";
import { useDispatch } from "react-redux";
import { setIsOverlay } from "../../../action";
import "./style.scss";
import Radio from "../../../app/RadioButton";

export default function AddressDetails(props) {
  const {
    userData,
    activeRow,
    setActiveRow,
    completedAction,
    setCompletedAction,
    selectedAddress,
    setSelectedAddress
  } = props;

  const dispatch = useDispatch();

  const [isAddressPopupOpened, setIsAddressPopupOpened] = useState(false);

  useEffect(() => {
    if (isAddressPopupOpened) {
      dispatch(setIsOverlay(true));
      document.body.style.overflow = "hidden";
    } else {
      dispatch(setIsOverlay(false));
      document.body.style.overflow = "auto";
    }
  }, [isAddressPopupOpened]);

  const onChangeHandler = (e) => {
    setCompletedAction({
      ...completedAction,
      second: true,
    });
    const address = userData.addresses.find((ele) => ele.id == e.target.value);
    setSelectedAddress(address);
  };

  return (
    <div className="checkout-row">
      <div className="checkout-row-top position-relative d-flex">
        <button
          className="d-flex align-items-start checkout-row- w-100"
          onClick={() => {
            activeRow === 2 ? setActiveRow(null) : setActiveRow(2);
          }}
        >
          <div
            className={`row-status d-flex justify-content-center align-items-center`}
            style={{
              backgroundColor: selectedAddress !== "" ? "#44b776" : "#fff",
            }}
          >
            <span>
              {selectedAddress === "" ? (
                2
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 507.506 507.506"
                  width="12"
                  height="12"
                >
                  <g>
                    <path
                      d="M163.865,436.934c-14.406,0.006-28.222-5.72-38.4-15.915L9.369,304.966c-12.492-12.496-12.492-32.752,0-45.248l0,0   c12.496-12.492,32.752-12.492,45.248,0l109.248,109.248L452.889,79.942c12.496-12.492,32.752-12.492,45.248,0l0,0   c12.492,12.496,12.492,32.752,0,45.248L202.265,421.019C192.087,431.214,178.271,436.94,163.865,436.934z"
                      fill="#FFF"
                    />
                  </g>
                </svg>
              )}
            </span>
          </div>
          <div className="row-data ms-3 font-14 text-start">
            <p
              className={`line-height-18 ${
                activeRow !== 2 ? "label-grey" : "label-black"
              }`}
            >
              Address
            </p>
            {selectedAddress !== "" && (
              <p className="mt-2">
                {`${selectedAddress.name}, ${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.pinCode}, ${selectedAddress.state}`}
              </p>
            )}
          </div>
        </button>
        {activeRow !== 2 && selectedAddress !== "" && (
          <button
            className="btn-orange-inverse font-12 ms-3"
            onClick={() => setActiveRow(2)}
          >
            Change
          </button>
        )}
      </div>
      {activeRow === 2 && (
        <div className="checkout-row-bottom">
          <button
            className="text-btn-orange font-14 font-medium"
            onClick={() => setIsAddressPopupOpened(true)}
          >
            <span className="plus-icon">+</span>
            <span className="ms-2">Add New Address</span>
          </button>

          <div className="mt-4">
            <ul>
              {userData.addresses &&
                userData.addresses.length > 0 &&
                userData.addresses.map((address, key) => {
                  return (
                    <li
                      className="d-flex align-items-start font-14 address-li"
                      key={`user-address-${key}`}
                    >
                      <Radio
                        defaultChecked={selectedAddress.id == address.id}
                        value={address.id}
                        name="address-radio"
                        id={`address_${key}`}
                        onChange={onChangeHandler}
                      />
                      <div className="addresses">
                        <span className="user-address-type">
                          {address.addressType}
                        </span>
                        <p className="mt-2">{address.name}</p>
                        <span className="text-grey">{`${address.address}, ${address.city}, ${address.pinCode}, ${address.state}`}</span>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>

          {isAddressPopupOpened && (
            <AddressPopup setIsAddressPopupOpen={setIsAddressPopupOpened} />
          )}
        </div>
      )}
    </div>
  );
}
