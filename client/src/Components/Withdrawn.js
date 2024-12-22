import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { WithdrawnAction } from "../Redux/Action/AuthActions";
// import axios from "axios";
import "./CSS/Withdraw.css";

const Withdraw = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.AuthReducer);

  const [WithdrawAmount, setWithdrawAmount] = useState("");

  const handleWithdraw = async (e) => {
    e.preventDefault();

    if (!WithdrawAmount || WithdrawAmount <= 0) {
      toast.error("Please enter a valid withdrawal amount!");
      return;
    }

    if (user?.balance < WithdrawAmount) {
      toast.error("Insufficient balance!");
      return;
    }

    try {
      dispatch(WithdrawnAction({ WithdrawAmount }));
      toast.success("Withdrawal successful!");
    } catch (error) {
      toast.error("An error occurred while processing the withdrawal!");
    }

    // Example Axios call:
    // await axios
    //   .post("http://localhost:5000/withdraw", { WithdrawAmount })
    //   .then((res) => {
    //     toast.success("Withdrawal successful!");
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     toast.error("An error occurred while processing the withdrawal!");
    //     console.log(err);
    //   });
  };

  return (
    <div className="withdraw-container">
      <ToastContainer autoClose={2000} />
      <div className="withdraw-header">
        <h2>Withdraw Money</h2>
        <div className="user-info">
          <p>
            <strong>Name:</strong> {user?.name || "N/A"}
          </p>
          <p>
            <strong>Balance:</strong> {user?.balance || 0}
          </p>
          <p>
            <strong>Account Number:</strong> {user?._id || "N/A"}
          </p>
        </div>
      </div>
      <form className="withdraw-form" onSubmit={handleWithdraw}>
        <div className="form-group">
          <label>Amount to Withdraw</label>
          <input
            type="number"
            value={WithdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="Enter amount..."
            required
          />
        </div>
        <button type="submit" className="withdraw-button">
          Withdraw
        </button>
      </form>
    </div>
  );
};

export default Withdraw;
