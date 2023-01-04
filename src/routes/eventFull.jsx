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

  const { event } = state;

  const onClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onBack = useCallback(() => {
    if (Date.now() - enterTime.current <= 5000) {
      const marksUrl = new URL("save_marks", REST_URL);
      axios.post(
        marksUrl.href,
        { [event.innerId]: 2 },
        { withCredentials: true }
      );
    }

    onClose();
  }, [navigate, onClose]);

  return (
    <Event
      event={event}
      deleteEvent={onClose}
      key={event.innerId}
      onBack={onBack}
      showFullInfo
    />
  );
};

export default EventFull;
