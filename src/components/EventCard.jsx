import { CalendarMonthOutlined, PinDropOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <Link
      to={`/event/${event.event_id}`}
      state={event}
      className="col-span-1 bg-gray-100 rounded-md"
    >
      <div className="relative bg-gray-300 rounded-md w-full h-48">
        <span className="absolute bottom-0 right-0 font-semibold bg-accent text-white text-xs p-1 rounded-tl-md">
          &#8358;5000
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="font-bold text-lg max-w-[80%] truncate">
            {event.event_name}
          </h3>
          <p className="text-xs">{event.event_start_date}</p>
        </div>
        <p className="mb-2 line-clamp-2 text-sm">{event.event_description}</p>

        {/* <div className="flex gap-1 items-center text-sm mb-2">
          <PinDropOutlined fontSize="small" />
          <p className="truncate">{event.event_venue}</p>
        </div>
        <div className="flex gap-1 items-center text-sm">
          <CalendarMonthOutlined fontSize="small" />
          <p className="truncate">{event.event_start_date}</p>
        </div> */}
      </div>
    </Link>
  );
};

export default EventCard;
