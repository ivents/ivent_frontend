import { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";

const Auth = () => {
  const [visibleComponent, setVisibleComponent] = useState("login");
  const [prevPage, setPrevPage] = useState(localStorage.getItem("prevPage"));

  if (visibleComponent === "signup") {
    return (
      <Signup setVisibleComponent={setVisibleComponent} prevPage={prevPage} />
    );
  } else {
    return (
      <Login setVisibleComponent={setVisibleComponent} prevPage={prevPage} />
    );
  }
};

export default Auth;
