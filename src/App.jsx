import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UserModeProvider, useUserMode } from "./contexts/UserModeContext";


// Layouts
import Layout from "./layout";
import { PrivateRoutesLayout } from "./pages/private/layout";
import VendorLayout from "./pages/vendor/layout";

// Public Pages
import Home from "./pages/public/home";
import Auth from "./pages/public/auth";
import EventDetails from "./pages/public/event";
import AboutUs from "./pages/public/about-us";
import Careers from "./pages/public/careers";
import ContactUs from "./pages/public/contact-us";
import Blog from "./pages/public/blog";
import Community from "./pages/public/community";
import Legal from "./pages/public/legal";
import GetHelp from "./pages/public/get-help";
import Pricing from "./pages/public/pricing";
import GetApp from "./pages/public/get-app";

// Private User Pages
import UserDashboard from "./components/UserDashboard";
import CreateEvent from "./pages/private/create-event";
import MyEvents from "./pages/private/my-events";
import Tickets from "./pages/private/tickets";
import Profile from "./pages/private/profile";

// Vendor Pages
import VendorDashboard from "./pages/vendor/home/VendorDashboard";
import VendorHome from "./pages/vendor/home/index";
import VendorEventListing from "./pages/vendor/eventlisting";
import VendorProfile from "./pages/vendor/profile";
import VendorTicketManagement from "./pages/vendor/ticketmanagement";
import Help from "./pages/vendor/Help";
  
// Protected Route Component
const ProtectedRoute = ({ children, requireVendor = false }) => {
  console.log('ProtectedRoute - Checking access...');
  const { userMode } = useUserMode();
  const auth = JSON.parse(localStorage.getItem('auth'));
  const isVendor = userMode === 'vendor';
  
  console.log('ProtectedRoute - Auth:', auth);
  console.log('ProtectedRoute - userMode:', userMode);
  console.log('ProtectedRoute - isVendor:', isVendor);
  console.log('ProtectedRoute - requireVendor:', requireVendor);

  if (!auth?.token) {
    console.log('ProtectedRoute - No auth token, redirecting to login');
    const redirectUrl = `/auth?redirect=${encodeURIComponent(window.location.pathname)}`;
    return <Navigate to={redirectUrl} />;
  }

  if (requireVendor && !isVendor) {
    console.log('ProtectedRoute - Vendor access required but user is not a vendor');
    return <Navigate to="/dashboard" />;
  }

  console.log('ProtectedRoute - Access granted');
  return children;
};

function App() {
  console.log('App component rendering...');
  
  // Check if we're in a browser environment before accessing window
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  console.log('Current path:', currentPath);
  
  return (
    <ThemeProvider>
      <UserModeProvider>
        <BrowserRouter>
   
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="auth" element={<Auth />} />
              <Route path="event/:id" element={<EventDetails />} />
              <Route path="about-us" element={<AboutUs />} />
              <Route path="careers" element={<Careers />} />
              <Route path="contact-us" element={<ContactUs />} />
              <Route path="blog" element={<Blog />} />
              <Route path="community" element={<Community />} />
              <Route path="legal" element={<Legal />} />
              <Route path="get-help" element={<GetHelp />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="get-app" element={<GetApp />} />
            </Route>

            {/* Private User Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <PrivateRoutesLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="create-event" element={<CreateEvent />} />
              <Route path="my-events" element={<MyEvents />} />
              <Route path="ticketmanagement" element={<VendorTicketManagement />} />
              <Route path="tickets" element={<Tickets />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Vendor Routes */}
            <Route path="/vendor" element={
              <ProtectedRoute requireVendor={true}>
                <VendorLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<VendorDashboard />} />
              <Route path="events" element={<VendorHome />} />
              <Route path="create-event" element={<CreateEvent vendorMode={true} />} />
              <Route path="eventlisting" element={<VendorEventListing />} />
              <Route path="ticketmanagement" element={<VendorTicketManagement />} />
              <Route path="profile" element={<VendorProfile />} />
              <Route path="help" element={<Help />} />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </UserModeProvider>
    </ThemeProvider>
  );
}

export default App;
