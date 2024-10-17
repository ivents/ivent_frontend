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
      {({ values, setFieldValue }) => (
        <Form>
          <div className="mb-4">
            <label htmlFor="event_background">Event background image</label>
            <input
              type="file"
              name="event_background"
              accept=".jpg, .jpeg, .png, .gif"
              className="w-full px-4 py-2"
              onChange={(event) => {
                // Set the field value to the selected file
                setFieldValue("event_background", event.currentTarget.files[0]);
              }}
            />
            <ErrorMessage name="event_background" component={TextError} />
          </div>

          <h3 className="mb-4">Other event images</h3>

          <div className="mb-4">
            <label htmlFor="event_images">Image 1</label>
            <input
              type="file"
              name="event_images1"
              accept=".jpg, .jpeg, .png, .gif"
              className="w-full px-4 py-2"
              onChange={(event) => {
                // Set the field value to the selected file
                setFieldValue("event_images1", event.currentTarget.files[0]);
              }}
            />
            <ErrorMessage name="event_images1" component={TextError} />
          </div>

          <div className="mb-4">
            <label htmlFor="event_images2">Image 2</label>
            <input
              type="file"
              name="event_images2"
              accept=".jpg, .jpeg, .png, .gif"
              className="w-full px-4 py-2"
              onChange={(event) => {
                // Set the field value to the selected file
                setFieldValue("event_images2", event.currentTarget.files[0]);
              }}
            />
            <ErrorMessage name="event_images2" component={TextError} />
          </div>

          <div className="mb-4">
            <label htmlFor="event_images3">Image 3</label>
            <input
              type="file"
              name="event_images3"
              accept=".jpg, .jpeg, .png, .gif"
              className="w-full px-4 py-2"
              onChange={(event) => {
                // Set the field value to the selected file
                setFieldValue("event_images3", event.currentTarget.files[0]);
              }}
            />
            <ErrorMessage name="event_images3" component={TextError} />
          </div>

          <div className="mb-4">
            <label htmlFor="event_images4">Image 4</label>
            <input
              type="file"
              name="event_images4"
              accept=".jpg, .jpeg, .png, .gif"
              className="w-full px-4 py-2"
              onChange={(event) => {
                // Set the field value to the selected file
                setFieldValue("event_images4", event.currentTarget.files[0]);
              }}
            />
            <ErrorMessage name="event_images4" component={TextError} />
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
