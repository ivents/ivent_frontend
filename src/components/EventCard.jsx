import { PinDropRounded, Timer } from "@mui/icons-material";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <Link
      to={`/event-details/${event.event_id}`}
      state={event}
      className="col-span-1"
    >
      <div className="bg-gray-300 rounded-md w-full h-32 mb-4" />
      <h3 className="font-bold">{event.event_name}</h3>
      <p className="mb-2">{event.event_description}</p>
      <div className="flex items-center justify-between text-sm">
        <div className="flex gap-2 items-center">
          <PinDropRounded fontSize="small" />
          <p>{event.event_venue}</p>
        </div>
        <div className="flex gap-2 items-center">
          <Timer fontSize="small" />
          <p>{event.event_start_date}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
