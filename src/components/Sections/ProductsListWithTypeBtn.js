import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductsJson from "../../assets/data/products.json";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";

export default function ProductsListWithTypeBtn() {
  const [productTypes, dimension] = useSelector((state) => [
    state.productTypes,
    state.dimension,
  ]);

  const [products, setProducts] = useState([]);
  const [seletedType, setSelectedType] = useState("Dresses");

  useEffect(() => {
    handleFilter("Dresses");
  }, []);

  const handleFilter = (type) => {
    setSelectedType(type);
    let arr = ProductsJson.products.filter((item) => {
      return item.product_type === type;
    });
    setProducts(arr);
  };

  const handleFilterByDropdown = (e) => {
    handleFilter(e.target.value);
  };

  return (
    <section className="product-list-with-type-section">
      <div className="container">
        <div className="top-wrapper d-flex justify-content-between">
          <div className="btn-wrapper d-flex gap-2 justify-content-between w-100 flex-wrap">
            {productTypes.length > 0 &&
              productTypes.map((type) => {
                return (
                  <button
                    className={`type-btn btn btn-dark ${
                      seletedType === type ? "selected" : ""
                    }`}
                    onClick={() => handleFilter(type)}
                    key={type}
                  >
                    {type}
                  </button>
                );
              })}
          </div>

          <select
            onChange={handleFilterByDropdown}
            className="btn-selection d-none w-50 py-2 font-14"
          >
            {productTypes.length > 0 &&
              productTypes.map((type) => {
                return (
                  <option
                    className={`type-btn btn btn-dark ${
                      seletedType === type ? "selected" : ""
                    }`}
                    value={type}
                    key={type}
                  >
                    {type}
                  </option>
                );
              })}
          </select>

          <div className="nav-btn-wrapper">
            <button
              className="me-3 swiper-btn"
              title="previous"
              id="prev-nav-products-type-section"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Outline"
                viewBox="0 0 24 24"
                width="36"
                height="36"
                fill="currentColor"
              >
                <path d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" />
              </svg>
            </button>

            <button
              title="next"
              id="next-nav-products-type-section"
              className="swiper-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Outline"
                viewBox="0 0 24 24"
                width="36"
                height="36"
                fill="currentColor"
              >
                <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="products-wrapper mt-5">
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
              prevEl: "#prev-nav-products-type-section",
              nextEl: "#next-nav-products-type-section",
            }}
          >
            {products.length > 0 &&
              products.map((product) => {
                return (
                  <SwiperSlide key={product.id}>
                    <ProductCard product={product} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
