export const EventGridSkeleton = () => {
  return [...Array(6)].map((card, index) => (
    <div key={index} className="col-span-1 animate-pulse">
      <div className="h-48 w-full bg-gray-200 rounded-lg mb-4" />
      <div className="flex justify-between">
        <div className="w-24 h-4 rounded-full bg-gray-200" />
        <div className="w-16 bg-gray-200 rounded-full" />
      </div>
    </div>
  ));
};

export const RoundedEventSkeleton = () => {
  return (
    <div className="flex gap-8 items-center skeleton">
      {[...Array(3)].map((item, index) => (
        <div key={index}>
          <div className="h-24 w-24 rounded-full bg-gray-200 mb-4" />
          <div className="h-4 rounded-full bg-gray-200 w-full" />
        </div>
      ))}
    </div>
  );
};
