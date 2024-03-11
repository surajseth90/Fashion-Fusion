import { Link } from "react-router-dom";
import ThankImg from "../../assets/images/thank-you.svg";

export default function index() {
  return (
    <div className="full-page flex-column">
      <img
        src={ThankImg}
        className="w-100 h-auto"
        style={{ maxWidth: 600 }}
        alt="thank you"
      />

      {/* <h3 className="mt-2">Thank you</h3> */}
      <p className="text-grey mt-2">Your order is being processed.</p>

      <Link
        className="btn-orange text-decoration-none mt-3"
        to={"/all-products"}
      >
        Keep Shopping
      </Link>
    </div>
  );
}
