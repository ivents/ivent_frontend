import { ErrorMessage, Field, Form, Formik } from "formik";
import TextError from "../../../../../components/TextError";
import { ArrowForwardOutlined } from "@mui/icons-material";
import * as Yup from "yup";

const stepOneValidationSchema = Yup.object({
  event_name: Yup.string().required("The name of your event is required"),
  event_description: Yup.string().required(
    "Please enter a description for your event"
  ),
  event_venue: Yup.string().required("Event venue is required"),
  event_city: Yup.string()
    .required("Event city is required")
    .notOneOf(["city"], "Please select a valid city"),
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

        <button type="submit" className="flex items-center gap-1 ml-auto">
          <span>Next</span>
          <ArrowForwardOutlined fontSize="inherit" />
        </button>
      </Form>
    </Formik>
  );
};

export default StepOne;
