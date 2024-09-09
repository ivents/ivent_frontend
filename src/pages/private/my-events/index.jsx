import { Link } from "react-router-dom";
import MyEventItem from "./components/MyEventItem";

const MyEvents = () => {
  return (
    <main className="p-4">
      <h1>My events</h1>
      <p className="mt-2 mb-8">The events you have created will show up here</p>

      {true ? (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <MyEventItem />
          <MyEventItem />
          <MyEventItem />
          <MyEventItem />
        </div>
      ) : (
        <p className="text-xl">
          No events yet!{" "}
          <Link to="/create-event" className="text-accent underline">
            Create an event
          </Link>{" "}
          to see it show up here.
        </p>
      )}
    </main>
  );
};

export default MyEvents;
