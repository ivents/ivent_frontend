import { useEffect, useState } from "react";

import { EventGridSkeleton } from "./components/Skeletons";
import axios from "axios";
import { FindInPageOutlined } from "@mui/icons-material";
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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log('Fetching events from:', '/api/events/all_created_events/');
        const response = await axios.get('/api/events/all_created_events/');
        console.log('Events response:', response);
        setEvents(response.data.data || []);
      } catch (error) {
        console.error('Error fetching events:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers
          }
        });
        setError(`Failed to load events. ${error.response?.data?.message || 'Please try again later.'}`);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSearch = useDebouncedCallback((e) => {
    console.log('Searching with:', searchFormData);
    setIsLoading(true);

    axios
      .get(
        `/api/events/search/`,
        {
          params: {
            search: searchFormData.searchQuery,
            event_city: searchFormData.city
          }
        }
      )
      .then((res) => {
        console.log('Search results:', res.data);
        setEvents(res.data);
      })
      .catch((error) => {
        console.error('Search error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        setError('Failed to search events. Please try again.');
      })
      .finally(() => {
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

      {error && <div className="text-red-500 text-center my-4">{error}</div>}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-4/5 mx-auto">
        {isLoading ? (
          <EventGridSkeleton />
        ) : events.length === 0 ? (
          searchFormData.searchQuery && searchFormData.city ? (
            <div>
              <FindInPageOutlined />
              <p>No events match your search</p>
            </div>
          ) : (
            <EventGridSkeleton />
          )
        ) : (
          events.map(
            (event) => event && <EventCard key={event.event_id} event={event} />
          )
        )}
      </div>
      <Footer />
    </main>
  );
};

export default Home;
