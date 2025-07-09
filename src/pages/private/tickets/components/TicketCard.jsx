import { DownloadOutlined } from "@mui/icons-material";

const TicketCard = () => {
  const downloadTicket = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tickets/123", {
        method: "GET",
      });

      if (!res.ok) throw new Error("Failed to download ticket");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "ticket.pdf";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download ticket. Please try again.");
    }
  };

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
          <button
            className="text-sm flex items-center gap-2 btn btn-accent"
            onClick={downloadTicket}
          >
            <DownloadOutlined fontSize="inherit" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
