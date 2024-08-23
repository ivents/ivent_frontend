import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/ReactToastify.css";
import LoadingSpinner from "../../../components/LoadingSpinner";

const Profile = () => {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    first_name: auth.user.first_name,
    last_name: auth.user.last_name,
    email: auth.user.email,
    phone_number: "",
    home_address: "",
    city: "",
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("Your first name is required"),
    last_name: Yup.string().required("Your last name too"),
    email: Yup.string()
      .email("Invalid email format")
      .required("We need your email address"),
  });

  const handleUpdateProfile = (values) => {
    setIsLoading(true);
    axios
      .put(`${process.env.BASE_URL}/auth/user_profile/${auth.user.id}/`, values)
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.message);
        const updatedUser = {
          token: auth.token,
          user: res.data.data,
        };

        localStorage.setItem("auth", JSON.stringify(updatedUser));
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(`An error occurred: ${error.message}`);
      });
  };

  return (
    <>
      <main className="w-[90%] md:w-3/4 lg:w-1/2 mx-auto py-8">
        <div className="h-24 w-24 rounded-full bg-gray-300 mx-auto" />
        <p className="font-bold text-lg text-center mt-4 text-gray-800">
          John Doe
        </p>
        <p className="text-center">johndoe@gmail.com</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleUpdateProfile}
        >
          <Form className="mt-8">
            <ToastContainer />
            <h1 className="mb-4">Personal information</h1>

            <div className="mb-4">
              <label htmlFor="first_name">First name</label>
              <Field
                className="w-full"
                type="text"
                name="first_name"
                id="first_name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="last_name">Last name</label>
              <Field
                className="w-full"
                type="text"
                name="last_name"
                id="last_name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <Field className="w-full" type="email" name="email" id="email" />
            </div>
            <div className="mb-4">
              <label htmlFor="phone_number">Phone number</label>
              <Field
                className="w-full"
                type="text"
                name="phone_number"
                id="phone_number"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="home_address">Home address</label>
              <Field
                className="w-full"
                type="text"
                name="home_address"
                id="home_address"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city">City</label>
              <Field className="w-full" type="text" name="city" id="city" />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="px-16 py-3 btn w-full bg-accent text-white rounded-md"
            >
              {isLoading ? <LoadingSpinner /> : "Update profile"}
            </button>
          </Form>
        </Formik>
      </main>
    </>
  );
};

export default Profile;
