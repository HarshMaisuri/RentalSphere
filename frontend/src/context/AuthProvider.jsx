import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  // user: null,
  // setUser: () => {},
  // token: null,
  // setToken: () => { },
  // logout: () => { }
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    if (
      window.localStorage.getItem("email") &&
      window.localStorage.getItem("email") !== undefined &&
      window.localStorage.getItem("token") &&
      window.localStorage.getItem("token") !== undefined &&
      window.localStorage.getItem("role") &&
      window.localStorage.getItem("role") !== undefined
    ) {
      setAuth({
        email: window.localStorage.getItem("email"),
        token: window.localStorage.getItem("token"),
        role: window.localStorage.getItem("role"),
      });
    } else if (
      window.localStorage.getItem("email") &&
      window.localStorage.getItem("email") !== undefined &&
      window.localStorage.getItem("token") &&
      window.localStorage.getItem("token") !== undefined
    ) {
      setAuth({
        email: window.localStorage.getItem("email"),
        token: window.localStorage.getItem("token"),
      });
    } else if (
      window.localStorage.getItem("email") &&
      window.localStorage.getItem("email") !== undefined
    ) {
      setAuth({
        email: window.localStorage.getItem("email"),
      });
    }
    // else {
    //   setAuth({
    //     email: "yashwalia@dal.ca",
    //     token:
    //       "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5YXNod2FsaWFAZGFsLmNhIiwiaWF0IjoxNzA4NTMxODAwLCJleHAiOjE3MDg1MzMyNDB9.Cp-3LGGlxtUrwTPDnQcxkywT0nts6F0S67F-60Jhd6w",
    //     role: "PROPERTY MANAGER",
    //     // role: "MANAGER-PENDING",
    //   });
    // }
  }, []);

  useEffect(() => {
    if (auth && auth.email && auth.token && auth.role) {
      window.localStorage.setItem("email", auth.email);
      window.localStorage.setItem("token", auth.token);
      window.localStorage.setItem("role", auth.role);
    } else if (auth && auth.email && auth.token) {
      window.localStorage.setItem("email", auth.email);
      window.localStorage.setItem("token", auth.token);
    } else if (auth && auth.email) {
      window.localStorage.setItem("email", auth.email);
    }
  }, [auth]);

  useEffect(() => {
    console.log("Auth change was made!!", auth, auth.email, auth.role);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
