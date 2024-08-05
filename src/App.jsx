import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout";
import Home from "./pages/public/home";
import Auth from "./pages/public/auth";
import { PrivateRoutesLayout } from "./pages/private/layout";
import EventDetails from "./pages/public/event";
import CreateEvent from "./pages/private/create-event";
import MyEvents from "./pages/private/my-events";
import Tickets from "./pages/private/tickets";
import Profile from "./pages/private/profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/event/:id" element={<EventDetails />} />
        </Route>
        <Route element={<PrivateRoutesLayout />}>
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
