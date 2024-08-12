import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import TextError from "../../../../components/TextError";
import * as Yup from "yup";
import {
  ArrowBackOutlined,
  ArrowForwardOutlined,
  CheckOutlined,
} from "@mui/icons-material";
import axios from "axios";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { toast, ToastContainer } from "react-toastify";

const stepOneValidationSchema = Yup.object({
  event_name: Yup.string().required("The name of your event is required"),
  event_description: Yup.string().required(
    "Please enter a description for your event"
  ),
});

// steps
const StepOne = (props) => {
  const handleSubmit = (values) => {
    props.next(values);
  };

  return (
    <Formik
      initialValues={props.data}
      validationSchema={stepOneValidationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="mb-4">
          <label htmlFor="event_name">Event name</label>
          <Field
            className="w-full px-4 py-2"
            name="event_name"
            id="event_name"
            placeholder="Type the name of your event here"
            required
          />
          <ErrorMessage name="event_name" component={TextError} />
        </div>

        <div className="mb-4">
          <label htmlFor="event_description">Event description</label>
          <Field
            className="w-full px-4 py-2"
            name="event_description"
            id="event_description"
            placeholder="Provide a short description of your event"
            required
          />
          <ErrorMessage name="event_description" component={TextError} />
        </div>

        <button type="submit" className="flex items-center gap-1 ml-auto">
          <span>Next</span>
          <ArrowForwardOutlined fontSize="inherit" />
        </button>
      </Form>
    </Formik>
  );
};

const stepTwoValidationSchema = Yup.object({
  event_venue: Yup.string().required("Event venue is required"),
  event_city: Yup.string()
    .required("Event city is required")
    .notOneOf(["city"], "Please select a valid city"),
});

const StepTwo = (props) => {
  const handleSubmit = (values) => {
    props.next(values, true);
  };

  return (
    <Formik
      initialValues={props.data}
      validationSchema={stepTwoValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <div className="mb-4">
            <label htmlFor="event_venue">Event venue</label>
            <Field
              className="w-full px-4 py-2"
              name="event_venue"
              id="event_venue"
              placeholder="Where is your event happening?"
              required
            />
            <ErrorMessage name="event_venue" component={TextError} />
          </div>

          <div className="mb-4">
            <label htmlFor="event_venue">Event city</label>
            <Field
              as="select"
              className="w-full px-4 py-2 rounded-md border border-gray-400"
              name="event_city"
              id="event_city"
              required
            >
              <option disabled value="city">
                City
              </option>
              <option value="abuja">Abuja</option>
              <option value="lagos">Lagos</option>
              <option value="portharcourt">Port Harcourt</option>
            </Field>
            <ErrorMessage name="event_city" component={TextError} />
          </div>

          <div className="flex items-center justify-end gap-4">
            <button
              onClick={() => props.prev(values)}
              type="button"
              className="flex items-center gap-1"
            >
              <ArrowBackOutlined fontSize="inherit" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              className="btn btn-accent flex items-center gap-1"
            >
              {props.isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <CheckOutlined fontSize="inherit" />
                  <span>Submit</span>
                </>
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const CreateEventMultiStepForm = () => {
  const token = JSON.parse(localStorage.getItem("auth")).token;

  const [data, setData] = useState({
    event_name: "",
    event_description: "",
    event_venue: "",
    event_slug: Date.now(),
    host_contact_details: JSON.parse(localStorage.getItem("auth")).user.email,
    host_id: JSON.parse(localStorage.getItem("auth")).user.id,
    event_category_id: "1",
    event_city: "city",
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const makeRequest = (formData) => {
    setIsLoading(true);
    axios
      .post(`${process.env.BASE_URL}/events/create_event/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.message);
        console.log(res);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("There was an error creating this event");
        console.log(error);
      });
  };

  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));

    if (final) {
      makeRequest(newData);
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handlePreviousStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <StepOne next={handleNextStep} data={data} />,
    <StepTwo
      next={handleNextStep}
      prev={handlePreviousStep}
      data={data}
      isLoading={isLoading}
    />,
  ];

  console.log(data);

  return (
    <main className="w-3/5 mx-auto mt-8">
      <ToastContainer />
      <h1 className="mb-8">Create an event</h1>
      {steps[currentStep]}
    </main>
  );
};

export default CreateEventMultiStepForm;
