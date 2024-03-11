import "./style.scss";
import Header from "../Header";
import SignInUp from "./SignInUp";
import ManageAccount from "./ManageAccount";
import Footer from "../Footer";
import BannerImg from "../../assets/images/home-bottom.svg";
import { useSelector } from "react-redux";

export default function Account() {
  const [loginedUser, userData] = useSelector((state) => [
    state.loginedUser,
    state.userData,
  ]);

  return (
    <div className="account-page position-relative">
      <Header />
      <section className="banner-img-section position-relative">
        <img className="banner-img" src={BannerImg} alt="shop banner" />
        <h2 className="position-absolute">Account</h2>
      </section>
      {loginedUser !== null ? (
        <ManageAccount loginedUser={loginedUser} userData={userData} />
      ) : (
        <SignInUp />
      )}
      <Footer />
    </div>
  );
}
