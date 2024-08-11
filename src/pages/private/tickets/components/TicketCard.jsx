import { DownloadOutlined } from "@mui/icons-material";

const TicketCard = () => {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-md p-2">
      <div className="h-40 w-full rounded-md bg-gray-300 mb-2" />

      <div className="p-2">
        <h3 className="mb-2">Lagos Connect</h3>

        <div className="flex items-center gap-4">
          <div className="text-sm">
            <p className="font-bold">Date</p>
            <p>Aug 7</p>
          </div>
          <div className="text-sm">
            <p className="font-bold">Time</p>
            <p>6:00PM</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 mt-4">
          <p className="font-bold text-gray-800 text-lg">&#8358;5000</p>
          <button className="text-sm flex items-center gap-2 btn btn-accent">
            <DownloadOutlined fontSize="inherit" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
