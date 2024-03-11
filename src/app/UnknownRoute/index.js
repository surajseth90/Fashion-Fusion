import { useNavigate } from "react-router-dom";
import "./style.scss";
import NotFound from "../../assets/images/Error Alien Spaceship.svg"

function UnknownPage() {
  const navigate = useNavigate();
  return (
    <div className="unknown-route-container">
      <div className="unknown-route-wrapper text-center">
      <img src={NotFound} alt="404" />

        <h1 className="mt-4" style={{fontSize:34}}>
        PAGE NOT FOUND
        </h1>
        <p className="mt-2 font-14 text-wrap" style={{maxWidth:400}}>
        The page you are looking for might have been removed had its name changed or is temporarily unavailable.
        </p>
        <button className="mt-4" onClick={() => navigate("/")}>
          Go To Home
        </button>
      </div>
    </div>
  );
}

export default UnknownPage;
