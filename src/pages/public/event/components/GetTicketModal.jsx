import {
  AddOutlined,
  ArrowForwardOutlined,
  CloseOutlined,
  ExitToAppOutlined,
  RemoveOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const GetTicketModal = ({ setIsShowingGetTicketModal, event }) => {
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));

  const location = useLocation();

  const handleSetTicketQuantity = (operation) => {
    if (operation === "dec" && ticketQuantity > 1) {
      setTicketQuantity((prev) => prev - 1);
    } else if (operation === "inc" && ticketQuantity < 5) {
      setTicketQuantity((prev) => prev + 1);
    }
  };

  return (
    <>
      <div
        onClick={() => setIsShowingGetTicketModal(false)}
        className="fixed z-30 inset-0 bg-black/30 backdrop-blur-sm"
      />

      {auth?.token ? (
        <div className="fixed z-40 w-[90%] sm:w-4/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg p-4 sm:p-8 bg-white">
          <button
            onClick={() => setIsShowingGetTicketModal(false)}
            aria-label="Close"
            className="block ml-auto"
          >
            <CloseOutlined />
          </button>

          <h3 className="mb-2 leading-[1.2]">
            Get your ticket to {event.event_name}!
          </h3>

          <div className="mb-2">
            <p className="font-bold">Price</p>
            <p>&#8358;5000</p>
          </div>

          <div className="mb-4">
            <p className="font-bold mb-1">Quantity</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSetTicketQuantity("dec")}
                className="bg-accent/10 text-accent h-8 w-8 grid place-content-center rounded-full"
              >
                <RemoveOutlined fontSize="inherit" />
              </button>
              <span>{ticketQuantity}</span>
              <button
                onClick={() => handleSetTicketQuantity("inc")}
                className="bg-accent/10 text-accent h-8 w-8 grid place-content-center rounded-full"
              >
                <AddOutlined fontSize="inherit" />
              </button>
            </div>
          </div>

          <p className="text-sm sm:text-base">
            By clicking "proceed to payment", you will be taken to a payment
            page to purchase your ticket(s)
          </p>
          <Link
            to="/"
            className="btn btn-accent mt-4 flex items-center justify-center gap-2"
          >
            <span>Proceed to payment</span>
            <ArrowForwardOutlined fontSize="inherit" />
          </Link>
        </div>
      ) : (
        <div className="fixed z-40 w-[90%] sm:w-4/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg p-4 sm:p-8 bg-white">
          <button
            onClick={() => setIsShowingGetTicketModal(false)}
            aria-label="Close"
            className="block ml-auto"
          >
            <CloseOutlined />
          </button>

          <h3 className="mb-2 leading-[1.2]">You are not logged in</h3>
          <p className="mb-4">
            Log in or create account to proceed with your ticket order
          </p>

          <Link
            to="/auth"
            className="btn btn-accent mt-4 flex items-center justify-center gap-2"
            onClick={() => localStorage.setItem("prevPage", location.pathname)}
          >
            <ExitToAppOutlined fontSize="inherit" />
            <span>Log in or sign up</span>
          </Link>
        </div>
      )}
    </>
  );
};

export default GetTicketModal;
