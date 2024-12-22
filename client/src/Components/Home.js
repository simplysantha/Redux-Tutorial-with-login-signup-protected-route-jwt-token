import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CheckBalanceAction } from "../Redux/Action/AuthActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const [balanceVisible, setBalanceVisible] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.AuthReducer);

  const handleCheckBalance = () => {
    dispatch(CheckBalanceAction())
      .then(() => {
        setBalanceVisible(true);
        toast.success(
          `Balance fetched successfully! Current Balance: ${user?.balance || 0}`
        );
      })
      .catch((error) => {
        toast.error("Failed to fetch balance. Please try again.");
      });
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h2>Welcome to Your Account</h2>
        <div className="user-info">
          <p>
            <strong>Name:</strong> {user?.name || "N/A"}
          </p>
          {balanceVisible && (
            <p>
              <strong>Balance:</strong> {user?.balance || 0}
            </p>
          )}
          <p>
            <strong>Account Number:</strong> {user?._id || "N/A"}
          </p>
        </div>
        <button className="check-balance-button" onClick={handleCheckBalance}>
          Check Balance
        </button>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Home;
