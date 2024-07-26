import { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";

const Auth = () => {
  const [visibleComponent, setVisibleComponent] = useState("signup");

  if (visibleComponent === "signup") {
    return <Signup setVisibleComponent={setVisibleComponent} />;
  } else {
    return <Login setVisibleComponent={setVisibleComponent} />;
  }
};

export default Auth;
