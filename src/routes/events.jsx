import React, { useEffect, useState, useCallback } from "react";
import Header from "../components/header";
import Event from "../components/event";
import axios from "axios";
import { REST_URL } from "../config";
import { useLocation, useNavigate } from "react-router-dom";

const Events = (props) => {
  const {} = props;

  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL("get_recs", REST_URL);

    axios.get(url.href, { withCredentials: true }).then((response) => {
      if (response.data) {
        setEvents(Object.values(response.data));
      }
    });
  }, []);

  const deleteEvent = useCallback(
    (id) => {
      setEvents((prev) => prev.filter((e) => e.innerId !== id));
    },
    [setEvents]
  );

  const navigateToFullEvent = useCallback(
    (event) => {
      const marksUrl = new URL("save_marks", REST_URL);

      axios.post(
        marksUrl.href,
        { [event.innerId]: 3 },
        { withCredentials: true }
      );
      navigate("/event", {
        state: { event, isFavourite: false },
      });
    },
    [navigate, deleteEvent]
  );

  return (
    <>
      <Header />
      <div className="grid md:grid-cols-3 gap-10 mb-20">
        <div className="max-w-3xl md:col-start-2 md:col-span-2">
          <div className="flex mb-5 justify-between items-center">
            <h1 className="text-5xl text-rose-500 font-custom font-bold">
              We found something interesting
            </h1>
          </div>
          <p className="opacity-80">
            A collection of the best events for you, your family and friends.
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-16">
        {events.map((e, i) => (
          <Event
            event={e}
            deleteEvent={deleteEvent}
            onClick={() => navigateToFullEvent(e)}
            key={e.innerId}
          />
        ))}
      </div>
    </>
  );
};

export default Events;
