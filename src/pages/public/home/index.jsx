import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "/logo.svg";

import HeaderCarousel from "./components/HeaderCarousel";
import SearchForm from "./components/SearchForm";
import { RoundedEventSkeleton } from "./components/Skeletons";

const Home = () => {
  const [events, setEvents] = useState([]);
  return (
    <main>
      <nav className="flex items-center justify-between bg-gray-900 py-2 px-[10%]">
        <Link to="/">
          <img className="h-10" src={logo} alt="Iventverse" />
        </Link>

        <div className="flex items-center gap-4">
          <Link className="btn btn-accent px-8" to="/auth">
            Sign up
          </Link>
        </div>
      </nav>

      <HeaderCarousel />

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
