import React, { useEffect } from "react";

export default function OrderPopup({ data, setSelectedOrderData }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="position-fixed w-100 h-100 left-0 top-0 d-flex justify-content-center align-items-center"
      style={{ zIndex: 100 }}
    >
      <div className="overlay"></div>
      <div
        className="order-popup-container w-100 h-100 bg-white position-relative p-4"
        style={{ maxHeight: 600, maxWidth: 800 }}
      >
        <button
          onClick={() => setSelectedOrderData(null)}
          type="button"
          title="close"
          className="position-absolut float-end"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
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

        <div className="overflow-hidden w-100 mt-5" style={{ height: "90%" }}>
          <div className="h-100 overflow-auto">
            <table className="w-100">
              <thead>
                <tr>
                  <th className="px-3 py-3 text-center">Image</th>
                  <th className="px-3 py-3 text-center">Title</th>
                  <th className="px-3 py-3 text-center">Variant</th>
                  <th className="px-3 py-3 text-center">Quantity</th>
                  <th className="px-3 py-3 text-center">Price</th>
                </tr>
              </thead>

              <tbody>
                {data.order.map((order) => {
                  return (
                    <tr key={`order_popup_${order.variantId}`}>
                      <td className="px-3 py-3 font-14 text-center text-nowrap">
                        <img
                          src={
                            order.product.variants[order.variantIndex]
                              .featured_image.src
                          }
                          alt={order.product.title}
                          width={50}
                        />
                      </td>
                      <td className="px-3 py-3 font-14 text-center text-nowrap">
                        {order.product.title}
                      </td>
                      <td className="px-3 py-3 text-center text-uppercase font-14">
                        {order.product.variants[order.variantIndex].option2 !==
                        null
                          ? `${
                              order.product.variants[order.variantIndex].option1
                            }/${
                              order.product.variants[order.variantIndex].option2
                            }`
                          : "Default"}
                      </td>

                      <td className="px-3 py-3 font-14 text-center">
                        {order.quantity}
                      </td>
                      <td className="px-3 py-3 font-14 text-center font-bold">
                        ${order.product.variants[order.variantIndex].price}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
