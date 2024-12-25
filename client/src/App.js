import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { fetchProfile } from "./Redux/Action/AuthActions";
import BankNavbar from "./Components/BankNavbar";
import Home from "./Components/Home";
import Deposit from "./Components/Deposit";
import Withdrawn from "./Components/Withdrawn";
import Auth from "./Components/Auth";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    // Fetch user profile on app load if token exists
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchProfile());
    }
  }, [dispatch]);

  return (
    <div className="App">
      <BankNavbar />
      <Routes>
        {/* Redirect / to /home if already logged in */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <Auth />}
        />

        {/* Protected Routes */}
        <Route
          path="/deposit"
          element={
            <ProtectedRoute>
              <Deposit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/withdrawn"
          element={
            <ProtectedRoute>
              <Withdrawn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
