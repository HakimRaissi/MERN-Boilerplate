/* Imports */

// External Modules
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Redux Actions
import { logout } from "../../redux/actions/users.actions";

// Styles
import "./style.css";

/* Main Component */

const Header = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.user);

  const [toggle, setToggle] = useState(false);

  return (
    <header className={user.isAuth ? "header header--auth" : "header"}>
      {user.isAuth && (
        <div className="user-info">
          <img
            src={user.image}
            alt={user.username}
            className="user-info__image"
          />
          <p className="user-info__username">{user.username}</p>
        </div>
      )}

      <nav className={toggle ? "nav nav--open" : "nav"}>
        {user.isAuth ? (
          <>
            <Link
              to="/"
              onClick={() => setToggle(false)}
              className="link nav__item"
            >
              Home
            </Link>

            <Link
              to="/dashboard"
              onClick={() => setToggle(false)}
              className="link nav__item"
            >
              Dashboard
            </Link>

            <Link
              to="/settings"
              onClick={() => setToggle(false)}
              className="link nav__item"
            >
              Settings
            </Link>

            <button
              onClick={() => dispatch(logout())}
              className="button button--danger nav__item"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/"
              onClick={() => setToggle(false)}
              className="link nav__item"
            >
              Home
            </Link>

            <Link
              to="/login"
              onClick={() => setToggle(false)}
              className="link nav__item"
            >
              Login
            </Link>

            <Link
              to="/signup"
              onClick={() => setToggle(false)}
              className="link nav__item"
            >
              Sign up
            </Link>
          </>
        )}
      </nav>

      <div
        onClick={() => setToggle(!toggle)}
        className={toggle ? "hamburger hamburger--open" : "hamburger"}
      >
        <span className="hamburger__span"></span>
        <span className="hamburger__span"></span>
        <span className="hamburger__span"></span>
        <span className="hamburger__span"></span>
      </div>
    </header>
  );
};

/* Export */

export default Header;
