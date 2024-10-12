import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import axios from "axios";

const FormWrapper = () => {
  const token = JSON.parse(localStorage.getItem("auth")).token;

  const [data, setData] = useState({
    event_name: "",
    event_description: "",
    event_images: "",
    event_bakground: "",
    event_visibility: "public",
    event_start_date: "2024-10-02",
    event_end_date: "2024-10-02",
    event_time: "13:00:00",
    event_venue: "",
    event_slug: Date.now(),
    host_contact_details: JSON.parse(localStorage.getItem("auth")).user.email,
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
          "Content-Type": "multipart/form-data",
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

export default FormWrapper;
