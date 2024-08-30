import { ErrorMessage, Field, Form, Formik } from "formik";
import TextError from "../../../../../components/TextError";
import { ArrowBackOutlined, CheckOutlined } from "@mui/icons-material";
import LoadingSpinner from "../../../../../components/LoadingSpinner";
import * as Yup from "yup";

const stepTwoValidationSchema = Yup.object({
  event_background: Yup.string().required("Event background is required"),
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
            <label htmlFor="event_background">Event background image</label>
            <Field
              className="w-full px-4 py-2"
              type="file"
              name="event_background"
              id="event_background"
              required
            />
            <ErrorMessage name="event_background" component={TextError} />
          </div>

          <div className="mb-4">
            <label htmlFor="event_images">Other event images</label>
            <Field
              className="w-full px-4 py-2"
              type="file"
              name="event_images"
              id="event_images"
              required
            />
            <ErrorMessage name="event_images" component={TextError} />
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

export default StepTwo;
