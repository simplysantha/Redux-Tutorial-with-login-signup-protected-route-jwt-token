import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logoutUser } from "../Redux/Action/AuthActions";
import "./CSS/BankNavbar.css";

function BankNavbar() {
  const { isAuthenticated } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    setMenuOpen(false); // Close the menu after logout
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="navbar-toggler" onClick={toggleMenu}>
            ☰
          </button>
          <div className="navbar-brand">
            <Link to="/home">Bank</Link>
          </div>
        </div>

        {/* Off-canvas menu for small screens */}
        <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          {isAuthenticated && (
            <>
              <Link to="/home" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link to="/deposit" onClick={() => setMenuOpen(false)}>
                Deposit
              </Link>
              <Link to="/withdrawn" onClick={() => setMenuOpen(false)}>
                Withdrawn
              </Link>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default BankNavbar;
