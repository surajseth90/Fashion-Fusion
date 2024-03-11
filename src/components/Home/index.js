import React, { Suspense } from "react";
import "./style.scss";
import Header from "../Header";
import HomeTopImg from "../../assets/images/home-top.png";
import HomeBottomImg from "../../assets/images/home-bottom.svg";
import { Link } from "react-router-dom";
import ProductsListWithTypeBtn from "../Sections/ProductsListWithTypeBtn";
import ProductQualitySection from "../Sections/ProductQualitySection";
import { Fallback } from "../../App";

const Footer = React.lazy(() => import("../Footer"));

export default function Home() {
  console.log("pdfs",process.env);
  return (
    <div className="home-page">
      <Header />
      <main>
        <section className="position-relative home-top-section">
          <img className="w-100" src={HomeTopImg} alt="shop now banner" />
          <div className="container d-flex align-items-center top-0 h-100">
            <div className="col-lg-5">
              <h2 className="text-white font-bold">
                Discover Elegance in a unique way
              </h2>
              <p className="text-white my-3">
                Explore the pinnacle of fashion collection for both men and
                women
              </p>
              <Link className="btn btn-dark" to={"/all-products"}>
                SHOP NOW
              </Link>
            </div>
          </div>
        </section>

        <ProductQualitySection />

        <ProductsListWithTypeBtn />
        <section className="position-relative">
          <img className="w-100" src={HomeBottomImg} alt="shop now banner" />
        </section>
      </main>
      <Suspense fallback={<Fallback />}>
        <Footer />
      </Suspense>
    </div>
  );
}
