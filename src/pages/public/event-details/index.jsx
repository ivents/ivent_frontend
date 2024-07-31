import { useLocation } from "react-router-dom";

const EventDetails = () => {
  const location = useLocation();
  return (
    <div>
      <div className="h-[40vh] w-full bg-gray-300 mb-4" />
      <h1 className="text-3xl mb-2">{location.state.event_name}</h1>
      <p>{location.state.event_description}</p>
    </div>
  );
};

export default EventDetails;
