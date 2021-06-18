/* Imports */

// External Modules
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { login } from "../../redux/actions/users.actions";

/* Global variables*/

const initialState = { email: "", password: "" };

/* Main Component*/

const Login = () => {
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState(initialState);

  const errorMessage = useSelector((state) => state.users.error.message);

  useEffect(() => {
    if (errorMessage) alert(errorMessage);
  }, [errorMessage]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(credentials));
    setCredentials(initialState);
  };

  return (
    <section className="section login">
      <h2 className="title">login page</h2>
      <p className="subtitle">Log to your account</p>

      <form onSubmit={handleSubmit} className="form form--login">
        <div>
          <label htmlFor="email" className="label">
            email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email here"
            value={credentials.email}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label htmlFor="password" className="label">
            password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password here"
            value={credentials.password}
            onChange={handleChange}
            className="input"
          />
        </div>

        <button className="button button--primary">login</button>
      </form>
      <p className="login__text">
        Don't have an account yet ?{" "}
        <Link to="signup" className="link">
          Join us here
        </Link>
      </p>
    </section>
  );
};

/* Export */

export default Login;
