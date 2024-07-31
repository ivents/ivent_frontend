import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const location = useLocation();
  const [event, setEvent] = useState(location.state);
  const { id } = useParams();

  useEffect(() => {
    if (!location.state) {
      axios
        .get("https://api.iventverse.com/v1/events/getting_event_by_id/1/")
        .then((res) => {
          setEvent(res.data.data[0]);
        })
        .catch((error) =>
          console.log("There was an error fetching this event: " + error)
        );
    }
  }, []);

  // if (!location.state) console.log("No location state");
  // else console.log(location.state);
  return (
    <>
      {event ? (
        <>
          <div className="h-[40vh] w-full bg-gray-300 mb-4" />
          <h1 className="text-3xl mb-2">{event.event_name}</h1>
          <p>{event.event_description}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default EventDetails;
