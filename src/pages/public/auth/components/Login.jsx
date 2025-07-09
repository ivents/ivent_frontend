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

  // Original API call code (commented out for reference)
  /*
  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${process.env.API_BASE_URL}/auth/signin/`, values);
      localStorage.setItem(
        "auth",
        JSON.stringify({ token: res.data.token, user: res.data.user })
      );
      localStorage.setItem("userMode", "user");
      toast.success("Logged in successfully!");
      navigate(prevPage || "/");
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error.response?.data?.non_field_errors?.[0] || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };
  */

  const onSubmit = async (values) => {
    setIsLoading(true);
    
    try {
      // Make API call to login endpoint
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/v1/auth/login/`, 
        {
          email: values.email,
          password: values.password
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          withCredentials: true // Important for cookies/sessions if using them
        }
      );
      
      // Handle successful login
      const { token, user } = response.data;
      
      // Store the auth data in localStorage
      localStorage.setItem(
        'auth',
        JSON.stringify({ token, user })
      );
      
      // Set user mode based on user type (assuming user object has a type field)
      const userMode = user.is_vendor ? 'vendor' : 'user';
      localStorage.setItem('userMode', userMode);
      
      // Show success message
      toast.success('Logged in successfully!');
      
      // Redirect to the previous page or home page
      const redirectPath = prevPage || '/';
      navigate(redirectPath);
      
      // Optional: Force a full page reload to ensure all context is updated
      window.location.reload();
      
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle different types of errors
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.detail || 
                         'Failed to log in. Please check your credentials and try again.';
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

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
