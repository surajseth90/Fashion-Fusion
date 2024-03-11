import Header from "../Header";
import "./style.scss";
import Filters from "./filters.js";
import { useSelector } from "react-redux";
import Footer from "../Footer";
import ProductCard from "../ProductCard";
import { useState } from "react";
import BannerImg from "../../assets/images/home-bottom.svg";

export default function AllProducts() {
  const [productsArray] = useSelector((state) => [state.productsArray]);
  const [filterValues, setFilterValues] = useState({});
  const [productList, setProductList] = useState(productsArray);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(6);
  const [showFilterPopup, setShowFilterPopup] = useState(false);

  const productsInOnePage = 12;

  return (
    <div className="all-products-page">
      <Header />
      <main>
        <section className="banner-img-section position-relative">
          <img className="banner-img" src={BannerImg} alt="shop banner" />
          <h2 className="position-absolute">Shop</h2>
        </section>
        <div className="container d-flex py-4 row">
          <div className="w-100 mb-4 d-none filter-popup-btn-wrapper">
            <button
              className="text-orange font-18 font-bold float-start"
              onClick={() => setShowFilterPopup(true)}
            >
              Show Filters
            </button>
          </div>
          <div
            className={`left-wrapper col-lg-2 col-md-3 justify-content-between ${
              showFilterPopup ? "show" : ""
            }`}
          >
           
            <Filters
              productsArray={productsArray}
              filterValues={filterValues}
              setFilterValues={setFilterValues}
              setProductList={setProductList}
              productList={productList}
              productsInOnePage={productsInOnePage}
              setPage={setPage}
              setTotalPages={setTotalPages}
              setShowFilterPopup={setShowFilterPopup}
              showFilterPopup={showFilterPopup}
            />
          </div>
          <div className="right-wrapper col-lg-10 col-md-9">
            <div className="py-2 font-18 font-bold d-flex">
              <div>{`${productList.length} Products Found`}</div>
            </div>
            <div className="products-wrapper">
              {productList
                .slice(
                  page * productsInOnePage,
                  page * productsInOnePage + productsInOnePage
                )
                .map((product) => {
                  return <ProductCard product={product} key={product.id} />;
                })}
            </div>
            <div className="mt-4 pagination-wrapper d-flex justify-content-center">
              {/* <button className="pagination-btn text-orange py-2 px-3 font-bold">
                Previous
              </button> */}
              <div className="pages-container d-flex gap-3">
                {Array.from(Array(totalPages).keys()).map((pageIndex) => {
                  return (
                    <button
                      key={`pagination-${pageIndex}`}
                      className={`btn-orange-inverse px-3 py-2 ${
                        page === pageIndex ? "selected font-bold" : ""
                      }`}
                      onClick={() => setPage(pageIndex)}
                    >
                      {pageIndex + 1}
                    </button>
                  );
                })}
              </div>
              {/* <button className="pagination-btn text-orange py-2 px-3 font-bold">
                Next
              </button> */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
