import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const Signup = ({ setVisibleComponent, prevPage }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    home_address: "",
    password: "",
    confirm_password: "",
  };

  const onSubmit = async (values) => {
    setIsLoading(true);
    
    try {
      // 1. Register the user
      const registerResponse = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/v1/auth/register/`,
        {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          address: values.home_address, // Changed from home_address to match API
          password: values.password,
          password_confirmation: values.confirm_password,
          role: 'user' // Assuming you have a role field
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      // 2. If registration is successful, log the user in
      toast.success("Account created successfully. Logging you in...");
      
      const loginResponse = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/v1/auth/login/`,
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      // 3. Handle successful login
      const { token, user } = loginResponse.data.data; // Assuming your API wraps response in a data object
      
      localStorage.setItem(
        'auth',
        JSON.stringify({ token, user })
      );
      
      // Set user mode based on role if needed
      const userMode = user.role === 'vendor' ? 'vendor' : 'user';
      localStorage.setItem('userMode', userMode);
      
      toast.success("Logged in successfully!");
      
      // Redirect to the previous page or home
      const redirectPath = prevPage || '/';
      navigate(redirectPath);
      
      // Optional: Force a full page reload to ensure all context is updated
      window.location.reload();
      
    } catch (error) {
      console.error('Signup error:', error);
      
      // Handle different types of errors
      let errorMessage = 'Failed to create account. Please try again.';
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.data?.errors) {
          // Handle validation errors
          const errors = error.response.data.errors;
          errorMessage = Object.values(errors)
            .flat()
            .join(' ');
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response from server. Please check your connection.';
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("Your first name is required"),
    last_name: Yup.string().required("Your last name too"),
    email: Yup.string()
      .email("Invalid email format")
      .required("We need your email address"),
    password: Yup.string()
      .min(8, "Password is too short - should be 8 characters minimum.")
      .required("Required"),
    confirm_password: Yup.string()
      .required("Input a value")
      .min(8, "Password is too short")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    home_address: Yup.string().required("Please provide your address"),
  });

  // state to store if the password is showing or not
  const [isShowingPassword, setIsShowingPassword] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="w-[90%] md:w-3/4 lg:w-1/2 mx-auto py-16">
        <ToastContainer />
        <h1 className="text-center font-bold text-4xl mb-16">Sign Up</h1>

        <div className="dynamic-grid gap-4 mb-4">
          <div>
            <label htmlFor="first_name">First name</label>
            <Field
              className="w-full px-4 py-2"
              type="text"
              name="first_name"
              id="first_name"
              placeholder="e.g. John"
              required
            />
            <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="last_name">Last name</label>
            <Field
              className="w-full px-4 py-2"
              type="text"
              name="last_name"
              id="last_name"
              placeholder="e.g. Doe"
              required
            />
            <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm mt-1" />
          </div>
        </div>

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
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
        </div>

        <div className="mb-4">
          <label htmlFor="home_address">Home Address</label>
          <Field
            className="w-full px-4 py-2"
            type="text"
            name="home_address"
            id="home_address"
            placeholder="Type your home address here"
            required
          />
          <ErrorMessage name="home_address" component="div" className="text-red-500 text-sm mt-1" />
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
          <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
        </div>

        <div className="mb-4">
          <label htmlFor="confirm">Confirm password</label>
          <Field
            className="w-full px-4 py-2"
            type="password"
            name="confirm_password"
            id="confirm_password"
            placeholder="********"
            required
          />
          <ErrorMessage name="confirm_password" component="div" className="text-red-500 text-sm mt-1" />
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="px-16 py-3 btn w-full bg-accent text-white rounded-md"
          >
            {isLoading ? <LoadingSpinner /> : "Sign Up"}
          </button>
        </div>

        <p className="text-center text-gray-600 mt-2">
          Do you have an account already?{" "}
          <button
            type="button"
            onClick={() => setVisibleComponent("login")}
            className="font-medium underline text-accent"
          >
            Log in
          </button>
        </p>
      </Form>
    </Formik>
  );
};

export default Signup;
