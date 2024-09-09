import { SubjectOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const MyEvents = () => {
  return (
    <main className="p-4">
      <h1>My events</h1>
      <p className="mt-2 mb-8">The events you have created will show up here</p>

      <p className="text-xl">
        No events yet!{" "}
        <Link to="/create-event" className="text-accent underline">
          Create an event
        </Link>{" "}
        to see it show up here.
      </p>
    </main>
  );
};

export default MyEvents;
