/* Imports */

// External Modules
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { signup } from "../../redux/actions/users.actions";

/* Global variables*/

const initialState = { email: "", username: "", password: "" };

/* Main Component */
const Signup = () => {
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
    dispatch(signup(credentials));
    setCredentials(initialState);
  };

  return (
    <section className="section signup">
      <h2 className="title">sign up page</h2>
      <p className="subtitle">Join our community</p>
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
          <label htmlFor="username" className="label">
            username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username here"
            value={credentials.username}
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

        <div>
          <label htmlFor="profilePicture" className="label">
            profile picture
          </label>
          <input
            name="profilePicture"
            id="profile-picture"
            type="file"
            className="input"
          />
        </div>

        <button className="button button--primary">sign up</button>
      </form>
      <p className="login__text">
        Already registred ?{" "}
        <Link to="login" className="link">
          Log into your account
        </Link>
      </p>
    </section>
  );
};

/* Export */
export default Signup;
