import { useState, useLayoutEffect } from "react";
import ErrorPage from "./ErrorPage";
import auth from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleGameClick = () => {
    navigate("/game");
  };
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the JWT token
    window.location.href = "/";
  };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="bebas-neue-regular">
      <h1 className="font-weight-bold text-light mb-5">ReelReveal</h1>
      {!loginCheck ? (
        <div>
          <button className="btn mr-3" onClick={handleGameClick}>Play as Guest</button>

          <button className="btn" onClick={handleLoginClick}>Login to Play</button>
        </div>
      ) : (
        <div>
          <button className="btn mr-3" onClick={handleGameClick}>Play Game</button>
          <button className="btn" onClick={handleLogout}>Log Out</button>
        </div>
      )}
    </div>
  );
};
export default Home;
