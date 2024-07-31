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
  LocationCityRounded,
  Pin,
  PinDropRounded,
  Search,
  Timer,
  Watch,
} from "@mui/icons-material";
import EventCard from "../../../components/EventCard";

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
      <nav className="flex items-center justify-between bg-gray-900 py-2 px-[10%]">
        <Link to="/">
          <img className="h-10" src={logo} alt="Iventverse" />
        </Link>

        <div className="flex items-center gap-4">
          <Link
            className="btn btn-accent px-8"
            to={auth?.token ? "/dashboard" : "/auth"}
          >
            {auth?.token ? "Dashboard" : "Sign up"}
          </Link>
        </div>
      </nav>

      <HeaderCarousel />

      <form className="w-4/5 mx-auto mb-8">
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

      {/* <SearchForm />

      <section className="lg:w-4/5 mx-auto">
        <h2 className="heading-lg mb-6 mx-4 md:mx-8 lg:mx-0 font-bold">
          See events happening near you
        </h2>
        <div className="flex items-start gap-10 overflow-x-scroll pb-4 mx-8">
          {events && events.length !== 0 ? (
            events.map((event) => (
              <Link
                to="/"
                key={event._id}
                className="text-center min-w-[5rem] md:min-w-[8rem]"
              >
                <img
                  className="h-12 w-12 md:h-24 md:w-24 mb-4 mx-auto rounded-full"
                  src={event.image}
                  alt="Event image"
                />
                <p className="text-xs sm:text-sm">{event.name}</p>
              </Link>
            ))
          ) : (
            <RoundedEventSkeleton />
          )}
        </div>
      </section> */}
    </main>
  );
};

export default Home;
