import Header from "../Header";
import Footer from "../Footer";
import BannerImg from "../../assets/images/home-bottom.svg";
import { useState } from "react";

export default function Blogs() {
  const [loading, setLoading] = useState(false);
  const [cotactFormData, setContactFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="contact-page">
      <Header />
      <section className="banner-img-section position-relative">
        <img className="banner-img" src={BannerImg} alt="shop banner" />
        <h2 className="position-absolute">Blogs</h2>
      </section>
      <main>
        <div className="container">
          <div className="container-top d-flex align-items-center flex-column text-center" style={{padding:"130px 0"}}>
            <h3 className="font-bold text-capitalize" style={{ fontSize: 32 }}>
              Coming Soon....
            </h3>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
