import React, { createContext, useState } from "react";
import { POST } from "../../constant/constant";

export const AuthContext = createContext();
export const AuthAction = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState("");

  const onSignin = async (email, password) => {
    const body = {
      email: email,
      pass: password,
    };

    // let result;

    await POST("login", body)
      .then((response) => {
        console.log(response.response);
        setUser(response.response);
        // if (response.response === "Logging in") {
        //   result = "success";
        // }

        // result = "fail";
      })
      .catch((error) => console.error(error));

    // console.info("value -> ", result);
    // return result;
  };
  const onSignup = async (email, password, name) => {
    const body = {
      email: email,
      name: name,
      pass: password,
    };

    await POST("signUp", body)
      .then((response) => console.log(response.response))
      .catch((error) => console.error(error));
  };

  return (
    <AuthContext.Provider value={{ user }}>
      <AuthAction.Provider value={{ onSignin, onSignup }}>
        {children}
      </AuthAction.Provider>
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
