import { useEffect, useState } from "react";

import { EventGridSkeleton } from "./components/Skeletons";
import axios from "axios";
import { Search } from "@mui/icons-material";
import EventCard from "../../../components/EventCard";
import Footer from "../../../components/Footer";
import SearchForm from "./components/SearchForm";
import { useDebouncedCallback } from "use-debounce";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [searchFormData, setSearchFormData] = useState({
    searchQuery: "",
    city: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}/events/all_created_events/`)
      .then((res) => {
        setEvents(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = useDebouncedCallback((e) => {
    setIsLoading(true);

    axios
      .get(
        `${process.env.BASE_URL}/events/search_events/?search=${searchFormData.searchQuery}`
      )
      .then((res) => {
        setEvents(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("An error occurred: " + error);
        setIsLoading(false);
      });
  }, 500);

  return (
    <main>
      {/* <HeaderCarousel /> */}
      <div className="w-full h-[30vh] bg-gray-300 mb-8" />

      <SearchForm
        handleSearch={handleSearch}
        searchFormData={searchFormData}
        setSearchFormData={setSearchFormData}
      />

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-4/5 mx-auto">
        {events?.length !== 0 && isLoading === false ? (
          events.map((event) => (
            <EventCard key={event.event_id} event={event} />
          ))
        ) : (
          <EventGridSkeleton />
        )}

        {isLoading === true && <EventGridSkeleton />}
      </div>
      <Footer />
    </main>
  );
};

export default Home;
