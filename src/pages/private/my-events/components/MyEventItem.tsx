import React from "react";

const MyEventItem = () => {
  return (
    <div className="col-span-1 border rounded-lg">
      <div className="h-64 w-full bg-gray-300 rounded-t-lg" />

      <div className="p-4">
        <p className="font-bold">Event name</p>
        <p>Event descrioption</p>
      </div>
    </div>
  );
};

export default MyEventItem;
