import React, { useContext } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Signin from "../screens/Auth/Signin";
import Signup from "../screens/Auth/Signup";
import ProfileCreation from "../screens/Auth/ProfileCreation";
import Splash from "../screens/Splash";
import Profile from "../screens/Profile";
import Community from "../screens/Community";
import Home from "../screens/Home";
import Messages from "../screens/Messages";
import Notifications from "../screens/Notifications";
import PostScreen from "../screens/PostScreen";
import { AuthContext } from "../context/AuthContext";

function Router() {
  const { user } = useContext(AuthContext);
  console.log("user ==> ", user);
  return (
    <BrowserRouter>
      <Routes>
        {/* <Switch> */}
        <Route index path="/" element={<Splash />} />
        <Route path="/Signin" element={<AuthRoute component={Signin} />} />
        <Route path="/Signup" element={<AuthRoute component={Signup} />} />
        <Route
          path="/ProfileCreation"
          element={<PrivateRoute component={ProfileCreation} />}
        />
        <Route
          path="/Profile"
          element={<ProtectedRoute component={Profile} />}
        />
        <Route
          path="/Community"
          element={<ProtectedRoute component={Community} />}
        />
        <Route path="/Home" element={<ProtectedRoute component={Home} />} />
        <Route
          path="/Notifications"
          element={<ProtectedRoute component={Notifications} />}
        />
        <Route
          path="/Messages"
          element={<ProtectedRoute component={Messages} />}
        />
        <Route
          path="/post"
          element={<ProtectedRoute component={PostScreen} />}
        />
        {/* </Switch> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

const ProtectedRoute = ({ component: Component }) => {
  const { user, isAuth } = useContext(AuthContext);
  return isAuth && user.first_name !== "" && user.first_name !== null ? (
    <Component />
  ) : isAuth && (user.first_name === "" || user.first_name === null) ? (
    <Navigate to="/ProfileCreation" replace />
  ) : (
    <Navigate to="/Signin" replace />
  );
};

function PrivateRoute({ component: Component }) {
  const { user, isAuth } = useContext(AuthContext);
  return isAuth && (user.first_name === "" || user.first_name === null) ? (
    <Component />
  ) : isAuth && user.first_name !== "" && user.first_name !== null ? (
    <Navigate to="/Home" replace />
  ) : (
    <Navigate to="/Signin" replace />
  );
}

const AuthRoute = ({ component: Component }) => {
  const { isAuth } = useContext(AuthContext);
  return !isAuth ? <Component /> : <Navigate to="/Home" replace />;
};
