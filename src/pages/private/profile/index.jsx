import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const Profile = () => {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));

  const initialValues = {
    first_name: auth.user.first_name,
    last_name: auth.user.last_name,
    email: auth.user.email,
    phone_number: "",
    password: "",
    nationality: "",
    city: "",
  };
  return (
    <main className="w-[90%] md:w-3/4 lg:w-1/2 mx-auto py-8">
      <div className="h-24 w-24 rounded-full bg-gray-300 mx-auto" />
      <p className="font-bold text-lg text-center mt-4 text-gray-800">
        John Doe
      </p>
      <p className="text-center">johndoe@gmail.com</p>

      <Formik initialValues={initialValues}>
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
            <label htmlFor="password">Password</label>
            <Field
              className="w-full"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nationality">Nationality</label>
            <Field
              className="w-full"
              type="text"
              name="nationality"
              id="nationality"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city">City</label>
            <Field className="w-full" type="text" name="city" id="city" />
          </div>

          <button type="submit" className="btn btn-accent w-full">
            Update profile
          </button>
        </Form>
      </Formik>
    </main>
  );
};

export default Profile;
