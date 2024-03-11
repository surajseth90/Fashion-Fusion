import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import ProductCard from "../ProductCard";

export default function UpsellProducts({ mainProduct }) {
  const [products, setProducts] = useState([]);

  const [productsArray, dimension] = useSelector((state) => [
    state.productsArray,
    state.dimension,
  ]);

  useEffect(() => {
    if (productsArray.length > 0) {
      let arr = productsArray.filter((product) => {
        if (
          product.product_type === mainProduct.product_type &&
          mainProduct.id !== product.id
        )
          return product;
      });

      setProducts(arr);
    }
  }, [mainProduct, productsArray]);

  return (
    <section className="upsell-products-container">
      <div className="container">
        <div className="top-container d-flex justify-content-between my-3">
          <h2>Smiliar Products</h2>
          <div className="upsell-btn-wrapper">
            <button id="upsell-left-btn" className="swiper-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Outline"
                viewBox="0 0 24 24"
                width="36"
                height="36"
              >
                <path d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" />
              </svg>
            </button>
            <button id="upsell-right-btn" className="swiper-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Outline"
                viewBox="0 0 24 24"
                width="36"
                height="36"
              >
                <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z" />
              </svg>
            </button>
          </div>
        </div>
        <Swiper
          slidesPerView={
            dimension.windowSize > 1200
              ? 5
              : dimension.windowSize <= 1200 && dimension.windowSize > 1080
              ? 4
              : dimension.windowSize <= 1080 && dimension.windowSize > 786
              ? 3
              : dimension.windowSize <= 786 && dimension.windowSize > 425
              ? 2
              : 1
          }
          spaceBetween={30}
          modules={[Navigation]}
          navigation={{
            prevEl: "#upsell-left-btn",
            nextEl: "#upsell-right-btn",
          }}
        >
          {products.length > 0 &&
            products.map((product) => {
              return (
                <SwiperSlide className="product-card" key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </section>
  );
}
