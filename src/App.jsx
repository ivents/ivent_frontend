import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout";
import Home from "./pages/public/home";
import Auth from "./pages/public/auth";
import { PrivateRoutesLayout } from "./pages/private/layout";
import Dashboard from "./pages/private/dashboard";
import EventDetails from "./pages/public/event";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/event/:id" element={<EventDetails />} />
        </Route>
        <Route element={<PrivateRoutesLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
