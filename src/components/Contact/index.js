import Header from "../Header";
import Footer from "../Footer";
import BannerImg from "../../assets/images/home-bottom.svg";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useDispatch } from "react-redux";
import { setSnakeBarContent } from "../../action";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [cotactFormData, setContactFormData] = useState({});

  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    await emailjs
      .sendForm(
        process.env.REACT_APP_EMAIL_JS_SERVICE_ID,
        process.env.REACT_APP_EMAIL_TEMPLATE_ID,
        e.target,
        {
          publicKey: process.env.REACT_APP_EMAIL_PUBLIC_KEY,
        }
      )
      .then(
        (res) => {
          setLoading(false);
          dispatch(setSnakeBarContent("Message Sent Successfully"))
          // sendReplyEmail(cotactFormData.email);
        },
        (error) => {
          setLoading(false);
          dispatch(setSnakeBarContent("There is some issue on sending message, please try again later!"))
          console.log("FAILED...", error.text);
        }
      );
  };

  // const sendReplyEmail = (recipientEmail) => {
  //   emailjs
  //     .send(
  //       process.env.REACT_APP_EMAIL_JS_SERVICE_ID,
  //       process.env.REACT_APP_EMAIL_TEMPLATE_ID,
  //       { reply_to: recipientEmail },
  //       {
  //         publicKey: process.env.REACT_APP_EMAIL_PUBLIC_KEY,
  //       }
  //     )
  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  // };

  return (
    <div className="contact-page">
      <Header />
      <section className="banner-img-section position-relative">
        <img className="banner-img" src={BannerImg} alt="shop banner" />
        <h2 className="position-absolute">Contact</h2>
      </section>
      <main>
        <div className="container">
          <div className="container-top d-flex align-items-center flex-column text-center py-5">
            <h3
              className="font-bold text-capitalize text-orange"
              style={{ fontSize: 22 }}
            >
              Get In Touch With Us
            </h3>
            <p className="text-grey text-capitalize col-lg-6 col-md-8 font-14 mt-1">
              For more information about our products. Please feel free to drop
              us an email. Our staff always be there to help you out. Do not
              heitate!
            </p>
          </div>

          <div className="d-flex justify-content-center w-100 py-5">
            <form
              onSubmit={submitHandler}
              style={{ maxWidth: 600 }}
              className="w-100"
            >
              <div className="row mb-3 flex-column">
                <label htmlFor="from_name" className="col-sm-2 col-form-label">
                  Name
                </label>
                <div className="col-sm-10 w-100">
                  <input
                    type="text"
                    className="form-control text-grey"
                    id="from_name"
                    name="from_name"
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="row mb-3 flex-column">
                <label htmlFor="user-email" className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-10 w-100">
                  <input
                    type="email"
                    className="form-control text-grey"
                    id="user-email"
                    name="email"
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="row mb-3 flex-column">
                <label
                  htmlFor="user-message"
                  className="col-sm-2 col-form-label"
                >
                  Message
                </label>
                <div className="col-sm-10 w-100">
                  <textarea
                    type="text"
                    className="form-control text-grey"
                    id="user-message"
                    name="message"
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    style={{ resize: "none", height: 100 }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-orange w-100 d-flex justify-content-center mt-5"
                disabled={loading}
              >
                {loading ? <div className="btn-loader-white"></div> : `SUBMIT`}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
