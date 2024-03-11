import React, { useState, useEffect } from "react";
import "./style.scss";

export default function Payment(props) {
  const {
    activeRow,
    setActiveRow,
    completedAction,
    setCompletedAction,
    userData,
    setSelectedPaymentMode,
    selectedPaymentMode,
    onCheckoutHandler,
    loading,
    taxCalculation,
    getTotalCartValue,
  } = props;
  const paymentOptions = ["CARD", "CASH"];
  const [cardDetails, setCardDetails] = useState({});

  useEffect(() => {
    checkCardDetailStatus();
  }, [cardDetails]);

  const checkCardDetailStatus = () => {
    if (Object.values(cardDetails).length !== 4) {
      setCompletedAction({
        ...completedAction,
        third: false,
      });
      return false;
    }
    if (
      cardDetails?.number.length !== 16 ||
      cardDetails?.month.length === 0 ||
      cardDetails?.year.length !== 4 ||
      cardDetails?.cvv.length !== 3
    ) {
      setCompletedAction({
        ...completedAction,
        third: false,
      });
      return false;
    }
    setCompletedAction({
      ...completedAction,
      third: true,
    });
  };

  const cardValidator = (e) => {
    const { name } = e.target;
    let input = e.target.value.replace(/\D/g, "");
    if (name === "card-number" && input.length > 16) {
      input = input.slice(0, 16);
    } else if (name === "card-month" && input.length > 2) {
      input = input.slice(0, 2);
    } else if (name === "card-year" && input.length > 4) {
      input = input.slice(0, 4);
    } else if (name === "card-cvv" && input.length > 3) {
      input = input.slice(0, 3);
    }
    return input;
  };

  const updatePaymentMethodHandler = (option) => {
    setSelectedPaymentMode(option);

    if (option === "CASH") {
      setCompletedAction({
        ...completedAction,
        third: true,
      });
    } else {
      checkCardDetailStatus();
    }
  };

  return (
    <div className="checkout-row payment-row">
      <div className="checkout-row-top position-relative d-flex">
        <button
          className="d-flex align-items-start checkout-row- w-100"
          onClick={() => {
            activeRow === 3 ? setActiveRow(null) : setActiveRow(3);
          }}
        >
          <div
            className={`row-status d-flex justify-content-center align-items-center`}
            style={{
              backgroundColor: completedAction?.third ? "#44b776" : "#fff",
            }}
          >
            <span>
              {!completedAction?.third ? (
                3
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
                activeRow !== 3 ? "label-grey" : "label-black"
              }`}
            >
              Payment
            </p>
          </div>
        </button>
      </div>
      {activeRow === 3 && (
        <div className="checkout-row-bottom">
          <div className="amount-section row-620w-container">
            <div className="amount-section-row d-flex">
              <p className="font-14 font-bold text-grey-black line-height-22">
                Total Amount
              </p>
              <p className="font-14 font-bold text-grey-black line-height-22">
                ${Number(getTotalCartValue()).toLocaleString()}
              </p>
            </div>
            <div className="amount-section-row d-flex">
              <p className="font-14 font-bold text-grey-black line-height-22">
                Taxes
              </p>
              <p className="font-14 font-bold text-grey-black line-height-22">
                ${Number(taxCalculation()).toLocaleString()}{" "}
                <span className="text-grey">(2%)</span>
              </p>
            </div>
            <div className="line w-100 mt-3 mb-3"></div>
            <div className="amount-section-row d-flex">
              <p className="font-14 font-bold text-grey-black line-height-22">
                Amount Payable{" "}
                <span className="text-grey font-12">(incl. of all taxes)</span>
              </p>
              <p className="font-14 font-bold text-grey-black line-height-22">
                $
                {Number(
                  taxCalculation() + getTotalCartValue()
                ).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="row-620w-container d-flex mt-4 flex-wrap ">
            {paymentOptions.map((option) => {
              return (
                <button
                  key={option}
                  className={`payment-btn font-11 font-bold ${
                    option === selectedPaymentMode ? "orange-tb-active-btn" : ""
                  }`}
                  onClick={() => {
                    updatePaymentMethodHandler(option);
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <div className="row-620w-container card-payment-container mt-4">
            {selectedPaymentMode === "CARD" && (
              <div className={`card-payment-row card-payment-middle`}>
                <div className="mt-1">
                  <label
                    htmlFor="card-number"
                    className="font-14 text-grey-black"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="Card Number"
                    id="card-number"
                    name="card-number"
                    className="w-100 text-grey mt-1 card-input"
                    value={cardDetails.number}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        number: cardValidator(e),
                      })
                    }
                  />
                </div>

                <div className="mt-4 d-flex">
                  <div className="w-75">
                    <label className="font-14 text-grey-black">
                      Valid Through
                    </label>
                    <div className="mt-1 w-100 d-flex">
                      <input
                        type="number"
                        placeholder="MM"
                        className="card-input w-50"
                        name="card-month"
                        value={cardDetails.month}
                        max={"12"}
                        min={0}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            month: cardValidator(e),
                          })
                        }
                      />
                      <input
                        type="text"
                        placeholder="YYYY"
                        className="card-input w-50 ms-1"
                        name="card-year"
                        value={cardDetails.year}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            year: cardValidator(e),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="w-25 ms-3">
                    <label className="font-14 text-grey-black">CVV </label>
                    <input
                      type="password"
                      className="card-input mt-1 w-100"
                      name="card-cvv"
                      value={cardDetails.cvv}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          cvv: cardValidator(e),
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="card-payment-row d-flex mb-2">
              <button
                className="btn-orange w-100 d-flex justify-content-center"
                disabled={
                  Object.values(completedAction).length !== 3 ||
                  !completedAction?.first ||
                  !completedAction?.second ||
                  !completedAction?.third ||
                  loading
                }
                onClick={onCheckoutHandler}
              >
                {loading ? (
                  <div className="btn-loader-white"></div>
                ) : selectedPaymentMode === "CARD" ? (
                  "Pay Now"
                ) : (
                  "Order Now"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
