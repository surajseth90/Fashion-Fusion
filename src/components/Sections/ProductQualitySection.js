import React from "react";
import Guarantee from "../../assets/images/guarantee-logo.svg";
import Affordable from "../../assets/images/affordable-logo.svg";
import Shipping from "../../assets/images/shipping-logo.svg";

export default function ProductQualitySection() {
  const dataArray = [
    {
      logo: Affordable,
      title: "Affordable Price",
      desc: "Shop currently knowing for it's best and affordable prices.",
    },

    {
      logo: Shipping,
      title: "Free Shipping",
      desc: "Free shipping in all over Bharat.",
    },

    {
      logo: Guarantee,
      title: "Quality Guarantee",
      desc: "30 day money-back guarantee.",
    },
  ];
  return (
    <section className="w-100 bg-grey mb-5 product-quality-section">
      <div className="container d-flex flex-wrap product-quality-container py-2">
        {dataArray.map((data, key) => {
          return (
            <div key={`Product_Quality_${key}`} className="d-flex px-4 align-items-center flex-column">
              <img src={data.logo} alt={data.title} width={30} height={30} />
              <h3 className="font-18">{data.title}</h3>
              <p className="font-14 text-center">{data.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
