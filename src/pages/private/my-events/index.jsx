import { Link } from "react-router-dom";
import MyEventItem from "./components/MyEventItem";
import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../../../components/EventCard";

const MyEvents = () => {
  const hostId = JSON.parse(localStorage.getItem("auth")).user.id;
  const token = JSON.parse(localStorage.getItem("auth")).token;

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://development.api.iventverse.com/v1/events/getting_event_by_host_id/${hostId}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        setEvents(res.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }, []);

  return (
    <main className="p-4">
      <h1>My events</h1>
      <p className="mt-2 mb-8">The events you have created will show up here</p>

      {isLoading ? (
        <p>Loading...</p>
      ) : events.length === 0 ? (
        <p>You have not created any events yet</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-4/5 mx-auto">
          {events.map((event) => (
            <EventCard key={event.event_id} event={event} />
          ))}
        </div>
      )}
    </main>
  );
};

export default MyEvents;
