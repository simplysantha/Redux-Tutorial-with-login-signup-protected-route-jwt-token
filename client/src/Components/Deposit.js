import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles
import { DepositAction } from "../Redux/Action/AuthActions";
import "./CSS/Deposit.css";

const Deposit = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.AuthReducer);
  const [DepositAmount, setDepositAmount] = useState("");

  const handleDeposit = async (e) => {
    e.preventDefault();

    if (!DepositAmount || DepositAmount <= 0) {
      toast.error("Please enter a valid deposit amount!");
      return;
    }

    try {
      dispatch(DepositAction({ DepositAmount }));
      toast.success("Deposit successful!");
    } catch (error) {
      toast.error("An error occurred while processing the deposit!");
    }

    // Example Axios call:
    /*     await axios
      .post("http://localhost:5000/deposit", { DepositAmount })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      }); */
  };

  return (
    <div className="deposit-container">
      <ToastContainer autoClose={2000} />
      <div className="deposit-header">
        <h2>Deposit Money</h2>
        <div className="user-info">
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Balance:</strong> {user?.balance}
          </p>
          <p>
            <strong>Account Number:</strong> {user?._id}
          </p>
        </div>
      </div>
      <form className="deposit-form" onSubmit={handleDeposit}>
        <div className="form-group">
          <label>Amount to Deposit</label>
          <input
            type="number"
            value={DepositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Enter amount..."
            required
          />
        </div>
        <button type="submit" className="deposit-button">
          Deposit
        </button>
      </form>
    </div>
  );
};

export default Deposit;
