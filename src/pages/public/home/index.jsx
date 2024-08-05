import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "/logo.svg";

import HeaderCarousel from "./components/HeaderCarousel";
import SearchForm from "./components/SearchForm";
import {
  EventGridSkeleton,
  RoundedEventSkeleton,
} from "./components/Skeletons";
import axios from "axios";
import {
  AddOutlined,
  ConfirmationNumberOutlined,
  EventNoteOutlined,
  LocationCityRounded,
  LogoutOutlined,
  PersonOutlined,
  Pin,
  PinDropRounded,
  Search,
  SortOutlined,
  Timer,
  Watch,
} from "@mui/icons-material";
import EventCard from "../../../components/EventCard";
import Footer from "../../../components/Footer";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));

  useEffect(() => {
    axios
      .get("https://api.iventverse.com/v1/events/all_created_events/")
      .then((res) => {
        setEvents(res.data.data);
        setFilteredEvents(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (e) => {
    const filteredEvents = events?.filter((event) =>
      `${event.event_name} ${event.event_description} ${event.event_venue}`
        .toLowerCase()
        .includes(e.target.value)
    );
    setFilteredEvents(filteredEvents);
  };

  return (
    <main>
      {/* <HeaderCarousel /> */}
      <div className="w-full h-[30vh] bg-gray-300 mb-8" />

      <form className="w-4/5 mx-auto mb-8">
        <label htmlFor="search_query">Search events</label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            onChange={handleSearch}
            type="text"
            name="search_query"
            id="search_query"
            placeholder="Type to search"
            aria-label="Search"
            className="w-full pl-12"
          />
        </div>
      </form>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-4/5 mx-auto">
        {filteredEvents?.length !== 0 || events?.length !== 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event.event_id} event={event} />
          ))
        ) : (
          <EventGridSkeleton />
        )}
      </div>
      <Footer />
    </main>
  );
};

export default Home;
