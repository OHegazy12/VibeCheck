import React, { createContext, useEffect, useState } from "react";
import { POST, POSTFORMDATA } from "../../constant/constant";

export const AuthContext = createContext();
export const AuthAction = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const userJSONdata = localStorage.getItem("user");
    const userData = JSON.parse(userJSONdata);

    // { "email": "123@123.com" } -> JSON Stringify
    // { email: "123@123.com" } -> JSON Parse

    if (userData !== null) {
      setUser(userData);
      setIsAuth(true);
    } else {
      setUser({});
      setIsAuth(false);
    }
  }, []);

  const onSignin = async (email, password) => {
    const body = {
      email: email,
      pass: password,
    };

    await POST("login", body)
      .then((response) => {
        alert(response.response);
        console.log(response.user);
        if (response.response === "Logging in") {
          setIsAuth(response.response === "Logging in" ? true : false);
          setUser(response.user);
          localStorage.setItem("user", JSON.stringify(response.user));
        }
      })
      .catch((error) => console.error(error));
  };

  const onProfileCreation = async (firstname, lastname, dob, image) => {
    const files = new FormData();
    files.append("image", image);
    files.append("firstname", firstname);
    files.append("lastname", lastname);
    files.append("dob", dob);
    files.append("email", user.email_address);

    await POSTFORMDATA("ProfileCreation", files)
      .then((response) => {
        alert(response.response);
        console.log(response);
        if (response.message === "success") {
          console.log(response.user);
          setIsAuth(true);
          setUser(response.user);
          localStorage.setItem("user", JSON.stringify(response.user));
        }
      })
      .catch((error) => console.error(error));
  };

  const onSignup = async (email, password, name) => {
    const body = {
      email: email,
      name: name,
      pass: password,
    };

    await POST("signUp", body)
      .then((response) => {
        console.log(response.response);
        if (response.response === "Added new user") {
          setIsAuth(true);
          setUser(response.user);
          localStorage.setItem("user", JSON.stringify(response.user));
        }
      })
      .catch((error) => console.error(error));
  };

  const onLogOut = () => {
    localStorage.clear();
    setIsAuth(false);
    setUser({});
  };

  return (
    <AuthContext.Provider value={{ user, isAuth }}>
      <AuthAction.Provider
        value={{ onSignin, onSignup, onProfileCreation, onLogOut }}
      >
        {children}
      </AuthAction.Provider>
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
