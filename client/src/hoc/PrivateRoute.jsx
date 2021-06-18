/* Imports */

// External Modules
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

/* Main Component */

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.users.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        user.isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

/* Export */

export default PrivateRoute;
