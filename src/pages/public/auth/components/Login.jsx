import { Link } from "react-router-dom";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "../../../../components/TextError";
import axios from "axios";

const Login = ({ setVisibleComponent }) => {
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    console.log("Form data", values);
    axios
      .post("https://ivents-backend.onrender.com/api/auth/login", values)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", JSON.stringify(res.data.accessToken));
        window.location.replace("/");
        // setToken(res.data.accessToken);
        // console.log(token);
      })
      .catch((error) => console.log(error));
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(8, "Password is too short - should be 8 characters minimum.")
      .required("Required"),
  });

  // state to store if the password is showing or not
  const [isShowingPassword, setIsShowingPassword] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="w-[90%] md:w-3/4 lg:w-1/2 mx-auto py-16">
        <h1 className="text-center font-bold text-4xl mb-16">Log in</h1>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <Field
            className="w-full px-4 py-2"
            type="email"
            name="email"
            id="email"
            placeholder="e.g. email@gmail.com"
            required
          />
          <ErrorMessage name="email" component={TextError} />
        </div>
        <div className="mb-4">
          <div className="relative">
            <label htmlFor="password">Password</label>
            <Field
              className="w-full px-4 py-2"
              type={isShowingPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="********"
              required
            />

            <button
              type="button"
              onClick={() => setIsShowingPassword((prev) => !prev)}
              className="absolute right-4 bottom-3 text-xs font-bold text-gray-400"
            >
              {isShowingPassword ? "HIDE" : "SHOW"}
            </button>
          </div>

          <ErrorMessage name="password" component={TextError} />
        </div>
        <Link
          to="/"
          className="block text-sm font-medium text-center mb-4 text-accent underline"
        >
          Forgot password?
        </Link>

        <div className="text-center">
          <button
            type="submit"
            className="px-16 py-3 btn w-full bg-accent text-white rounded-md"
          >
            Log in
          </button>
        </div>

        <p className="text-center text-gray-600 mt-2">
          Don't have an account?{" "}
          <button
            onClick={() => setVisibleComponent("signup")}
            className="font-medium underline text-accent"
          >
            Sign up
          </button>
        </p>
      </Form>
    </Formik>
  );
};

export default Login;
