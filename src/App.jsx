import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UserModeProvider } from "./contexts/UserModeContext";

import Layout from "./layout";
import Users  from "../src/VendorDashboard/home/index";
import Home from "./pages/public/home";
import Auth from "./pages/public/auth";
import { PrivateRoutesLayout } from "./pages/private/layout";
import EventDetails from "./pages/public/event";
import CreateEvent from "./pages/private/create-event";
import MyEvents from "./pages/private/my-events";
import Tickets from "./pages/private/tickets";
import Profile from "./pages/private/profile";
import AboutUs from "./pages/public/about-us";
import Careers from "./pages/public/careers";
import ContactUs from "./pages/public/contact-us";
import Blog from "./pages/public/blog";
import Community from "./pages/public/community";
import Legal from "./pages/public/legal";
import GetHelp from "./pages/public/get-help";
import Pricing from "./pages/public/pricing";
import GetApp from "./pages/public/get-app";

function App() {
  return (
    <ThemeProvider>
      <UserModeProvider>
        <BrowserRouter>
        <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/community" element={<Community />} />
          <Route path="/get-help" element={<GetHelp />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/get-app" element={<GetApp />} />
        </Route>
        <Route element={<PrivateRoutesLayout />}>
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Users />} />
        </Route>
        </Routes>
        </BrowserRouter>
      </UserModeProvider>
    </ThemeProvider>
  );
}

export default App;
