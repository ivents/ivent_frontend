import { CalendarMonthOutlined, PinDropOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <Link to={`/event/${event.event_id}`} state={event} className="col-span-1">
      <div className="bg-gray-300 rounded-md w-full h-32 mb-4" />
      <h3 className="font-bold truncate">{event.event_name}</h3>
      <p className="mb-2 truncate">{event.event_description}</p>

      <div className="flex gap-1 items-center text-sm mb-2">
        <PinDropOutlined fontSize="small" />
        <p className="truncate">{event.event_venue}</p>
      </div>
      <div className="flex gap-1 items-center text-sm">
        <CalendarMonthOutlined fontSize="small" />
        <p className="truncate">{event.event_start_date}</p>
      </div>
    </Link>
  );
};

export default EventCard;
