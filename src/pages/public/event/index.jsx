import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../../components/Footer";
import { AccessTimeOutlined, CalendarMonthOutlined } from "@mui/icons-material";
import { eventDummy } from "../../../../data";
import GetTicketModal from "./components/GetTicketModal";

const EventDetails = () => {
  const location = useLocation();
  const [event, setEvent] = useState(location.state);
  const [isShowingGetTicketModal, setIsShowingGetTicketModal] = useState(false);

  useEffect(() => {
    if (!location.state) {
      axios
        .get("https://api.iventverse.com/v1/events/getting_event_by_id/1/")
        .then((res) => {
          setEvent(res.data.data[0]);
        })
        .catch((error) =>
          console.log("There was an error fetching this event: " + error)
        );
    }
  }, []);

  return (
    <>
      {event ? (
        <>
          <img
            src={event.event_background}
            alt="Backgound"
            className="h-[40vh] w-full object-cover mb-8"
          />

          {isShowingGetTicketModal && (
            <GetTicketModal
              setIsShowingGetTicketModal={setIsShowingGetTicketModal}
              event={event}
            />
          )}

          <section className="w-4/5 mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start mb-4">
              <div>
                <h1 className="mb-2">{event.event_name}</h1>
                <p className="max-w-[40ch]">{event.event_description}</p>
              </div>
              <button
                onClick={() => setIsShowingGetTicketModal(true)}
                className="btn btn-accent"
              >
                Get tickets - <span className="font-bold">&#8358;5000</span>
              </button>
            </div>

            <div className="flex items-start gap-8">
              <div className="flex items-center gap-2">
                <div className="bg-accent/10 h-10 w-10 grid place-content-center rounded-full">
                  <CalendarMonthOutlined className="text-accent" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Date</p>
                  <p className="max-w-[20ch]">{eventDummy.start_date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-accent/10 h-10 w-10 grid place-content-center rounded-full">
                  <AccessTimeOutlined className="text-accent" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Time</p>
                  <p className="max-w-[20ch]">{eventDummy.start_time}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-4/5 mx-auto mt-8">
            <h3>Photos</h3>
            <div className="flex flex-wrap gap-2 mt-4">
              <img
                src={event.event_images1}
                alt="Image 1"
                className="h-48 min-w-56 object-cover rounded-md"
              />
              <img
                src={event.event_images2}
                alt="Image 1"
                className="h-48 min-w-56 object-cover rounded-md"
              />
              <img
                src={event.event_images3}
                alt="Image 1"
                className="h-48 min-w-56 object-cover rounded-md"
              />
              <img
                src={event.event_images4}
                alt="Image 1"
                className="h-48 min-w-56 object-cover rounded-md"
              />
            </div>
          </section>

          <section className="w-4/5 mx-auto mt-8">
            <h3>About the host</h3>

            <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center my-4">
              <div className="flex items-center gap-2">
                <div className="grid place-content-center h-12 w-12 rounded-full bg-accent/10">
                  <p>SM</p>
                </div>
                <div>
                  <p className="text-gray-800 font-medium">Sean Michael</p>
                  <p>Lagos Island</p>
                </div>
              </div>

              <Link to="/" className="btn btn-secondary">
                Visit profile
              </Link>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium sit, minima maxime pariatur cum quisquam voluptate.
              Cupiditate nemo cumque minus magnam amet nisi vitae id dolores,
              eum molestiae voluptas facilis numquam consequuntur saepe! Nihil
              numquam est vel fuga aliquid sed velit impedit iste ratione, autem
              inventore ad quas dolor architecto?
            </p>
          </section>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <Footer />
    </>
  );
};

export default EventDetails;
