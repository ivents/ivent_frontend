import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const Login = ({ setVisibleComponent, prevPage }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isShowingPassword, setIsShowingPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(8, "Password is too short - should be 8 characters minimum.")
      .required("Required"),
  });

  // Simulate successful login without backend
  const onSubmit = (values) => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      localStorage.setItem(
        "auth",
        JSON.stringify({ 
          token: "dummy-token-for-development", 
          user: { 
            id: 1, 
            email: values.email,
            name: values.email.split('@')[0],
            is_vendor: false
          } 
        })
      );
      toast.success("Logged in successfully! (Demo mode)");
      // Redirect to main dashboard after successful login
      prevPage ? navigate(prevPage) : navigate("/");
      setIsLoading(false);
    }, 1000);
  };

  // Original API call code (commented out)
  /*
  const onSubmit = (values) => {
    setIsLoading(true);
    axios
      .post(`${process.env.API_BASE_URL}/auth/signin/`, values)
      .then((res) => {
        localStorage.setItem(
          "auth",
          JSON.stringify({ token: res.data.token, user: res.data.user })
        );
        toast.success("Logged in successfully!");
        prevPage ? navigate(prevPage) : navigate("/");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("an error occurred", error);
        setIsLoading(false);
        toast.error(error.response?.data?.non_field_errors?.[0] || "An error occurred during login");
      });
  };
  */

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="w-[90%] md:w-3/4 lg:w-1/2 mx-auto py-16">
        <ToastContainer />
        <h1 className="text-center font-bold text-4xl mb-16">Log in</h1>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <Field
            className="w-full"
            type="email"
            name="email"
            id="email"
            placeholder="e.g. email@gmail.com"
            required
          />
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div className="mb-4">
          <div className="relative">
            <label htmlFor="password">Password</label>
            <Field
              className="w-full"
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

          <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
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
            disabled={isLoading}
            className="px-16 py-3 btn w-full bg-accent text-white rounded-md"
          >
            {isLoading ? <LoadingSpinner /> : "Log in"}
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
