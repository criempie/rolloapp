import axios from "axios";
import React, { useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Event from "../components/event";
import { REST_URL } from "../config";

const EventFull = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const enterTime = useRef();

  useEffect(() => {
    enterTime.current = Date.now();
  }, []);

  useEffect(() => {
    if (!state || !state.event) {
      navigate("/events");
    }
  }, [navigate, state]);

  if (!state || !state.event) return;

  const { event, isFavourite } = state;

  const onClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onBack = useCallback(() => {
    if (Date.now() - enterTime.current <= 5000) {
      const marksUrl = new URL("save_marks", REST_URL);

      if (!isFavourite) {
        axios.post(
          marksUrl.href,
          { [event.innerId]: 2 },
          { withCredentials: true }
        );
      }
    }

    onClose();
  }, [navigate, onClose]);

  return (
    <div style={{ minHeight: "83vh" }}>
      <Event
        event={event}
        isFavourite
        deleteEvent={onClose}
        key={event.innerId}
        onBack={onBack}
        showFullInfo
      />
    </div>
  );
};

export default EventFull;
