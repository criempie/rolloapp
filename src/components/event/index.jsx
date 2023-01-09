import axios from "axios";
import "./index.css";
import React, { useCallback, useState } from "react";
import { REST_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const Event = (props) => {
  const { event, deleteEvent, onClick, onBack, showFullInfo, likeIsHide } =
    props;
  const marksUrl = new URL("save_marks", REST_URL);

  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const onLike = useCallback(
    (e) => {
      e.stopPropagation();

      axios
        .post(marksUrl.href, { [event.innerId]: 4 }, { withCredentials: true })
        .then(() => setLiked(true));
    },
    [event.innerId, setLiked]
  );

  const onCross = useCallback(
    (e) => {
      e.stopPropagation();

      axios
        .post(marksUrl.href, { [event.innerId]: 1 }, { withCredentials: true })
        .then(() => {
          deleteEvent && deleteEvent(event.innerId);
        });
    },
    [deleteEvent, event.innerId]
  );

  const onBuyTicket = useCallback(() => {
    axios.post(
      marksUrl.href,
      { [event.innerId]: 5 },
      { withCredentials: true }
    );

    if (event.aflink) {
      window.location.replace(event.aflink);
    } else {
      navigate("/events");
    }
  }, [event.innerId, event.aflink, navigate]);

  const onPhone = useCallback(() => {
    axios.post(
      marksUrl.href,
      { [event.innerId]: 5 },
      { withCredentials: true }
    );
  }, []);

  const onAddress = useCallback(() => {
    axios.post(
      marksUrl.href,
      { [event.innerId]: 5 },
      { withCredentials: true }
    );
  }, []);

  return (
    <div
      onClick={onClick}
      className="bg-white flex flex-col group hover:-translate-y-4 transition-all duration-300 overflow-hidden rounded-2xl isolate"
    >
      <div className="relative overflow-hidden isolate">
        <img
          src={event.fololink}
          className="h-64 group-hover:scale-110 transition-all duration-300 object-top bg-slate-900 w-full -z-10 object-cover"
        />
        {onBack && (
          <button
            onClick={onBack}
            className="event-button"
            style={{ top: "1rem", left: "1rem", position: "absolute" }}
          >
            <img src="images/arrow.svg" />
          </button>
        )}
        <span
          style={{ left: onBack && "calc(1rem + 36px + 8px)" }}
          className="absolute group-hover:bg-violet-500 top-4 left-4 rounded-full bg-violet-600/60 font-bold px-5 py-2 text-white font-custom text-sm backdrop-blur-md uppercase letter tracking-wide"
        >
          {event.ty}
        </span>
        <div className="buttons-container">
          {!likeIsHide && !liked && (
            <button onClick={onLike} className="event-button">
              <img src="images/save.svg" />
            </button>
          )}
          <button onClick={onCross} className="event-button">
            <img src="images/trash.svg" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 p-5 justify-between flex-col">
        <div className="mb-5">
          <p className="text-slate-500 mb-3">{event.dt}</p>
          <h2 className="text-xl group-hover:text-purple-600 text-purple-500 font-bold font-custom">
            {event.name}
          </h2>
          <p className="text-slate-500">{event.place}</p>
        </div>
        <p className="text-xl font-bold">${event.price}</p>
        {/* {+price === 0 && <p className="text-xl text-emerald-500 font-bold">Free</p>}
				{+price !== 0 && <p className="text-xl font-bold">${price}</p>} */}
        {showFullInfo && (
          <>
            <div style={{ marginTop: "1em" }}>
              <a className="button" onClick={onBuyTicket}>
                Купить билет
              </a>
              <button className="button" onClick={onPhone}>
                {event.phone}
              </button>
              <button className="button" onClick={onAddress}>
                {event.adress}
              </button>
            </div>
            <div style={{ marginTop: "1em" }}>
              <h3>О событии</h3>
              <p>{event.descant}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Event;
