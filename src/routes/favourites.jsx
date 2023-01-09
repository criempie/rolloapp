import React, { useEffect, useState, useCallback } from "react";
import Header from "../components/header";
import Event from "../components/event";
import axios from "axios";
import { REST_URL } from "../config";
import { useLocation, useNavigate } from "react-router-dom";

const Favourites = (props) => {
  const {} = props;

  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL("get_favorites", REST_URL);

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
        state: { event },
      });
    },
    [navigate, deleteEvent]
  );

  return (
    <>
      <Header />

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

export default Favourites;
