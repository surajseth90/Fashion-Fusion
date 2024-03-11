export default function Payment(props) {
  const {
    activeRow,
    setActiveRow,
    completedAction,
    setCompletedAction,
    userData,
  } = props;

  return (
    <div className="checkout-row payment-row">
      <div className="checkout-row-top position-relative d-flex">
        <button
          className="d-flex align-items-start checkout-row- w-100"
          onClick={() => {
            setCompletedAction({
              ...completedAction,
              first: true,
            });
            activeRow === 1 ? setActiveRow(null) : setActiveRow(1);
          }}
        >
          <div
            className={`row-status d-flex justify-content-center align-items-center`}
            style={{
              backgroundColor: completedAction?.first ? "#44b776" : "#fff",
            }}
          >
            <span>
              {!completedAction?.first ? (
                1
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
                activeRow !== 1 ? "label-grey" : "label-black"
              }`}
            >
              Appearls
            </p>
          </div>
        </button>
      </div>
      {activeRow === 1 && (
        <div className="checkout-row-bottom">
          {userData.cart.map(({ product, variantIndex, quantity },key) => {
            return (
              <div className=" d-flex py-2" key={`checkout-order-details-${key}`}>
                <div className="position-relative">
                  <img
                    style={{ width: 80, aspectRatio: 1 }}
                    src={product.variants[variantIndex].featured_image.src}
                    alt={product.title}
                  />
                  <div
                    className="position-absolute font-bold bg-grey px-2 py-1 rounded-circle font-12"
                    style={{ top: -10, left: -10 }}
                  >
                    {quantity}
                  </div>
                </div>

                <div className="ms-3">
                  <p className="font-bold font-14">{product.title}</p>
                  <p className="font-12">
                    Variant:
                    {`${
                      product.variants.length === 1
                        ? "Default"
                        : `${product.variants[variantIndex].option1}/${product.variants[variantIndex].option2}`
                    }`}
                  </p>
                  <p className="font-12 font-bold mt-1">
          ${product.variants[variantIndex].price}
        </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
