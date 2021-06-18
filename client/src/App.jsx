/* Imports */

// Exeternal Modules
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Default from "./pages/Default";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

// HOCs
import PrivateRoute from "./hoc/PrivateRoute";
import PublicRoute from "./hoc/PublicRoute";

// Redux Actions
import { auth } from "./redux/actions/users.actions";

/* Main Component */
const App = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.users.loading);

  useEffect(() => {
    if (Cookies.get("auth_token")) dispatch(auth());
  }, [dispatch]);

  return loading ? (
    <Loading />
  ) : (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/signup" component={Signup} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/settings" component={Settings} />
        <Route component={Default} />
      </Switch>
      <Footer />
    </Router>
  );
};

/* Export */

export default App;
