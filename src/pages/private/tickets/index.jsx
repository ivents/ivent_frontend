import TicketCard from "./components/TicketCard";

const Tickets = () => {
  return (
    <main className="p-2">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
        <TicketCard />
        <TicketCard />
        <TicketCard />
        <TicketCard />
      </div>
    </main>
  );
};

export default Tickets;
