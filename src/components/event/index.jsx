import axios from "axios";
import React, { useCallback } from "react";
import { REST_URL } from "../../config";

const Event = (props) => {
  const {
    category,
    imageSrc,
    date,
    title,
    location,
    price,
    innerId,
    deleteEvent,
  } = props;
  const marksUrl = new URL("save_marks", REST_URL);

  const onLike = useCallback(() => {
    axios.post(marksUrl.href, { [innerId]: 4 }, { withCredentials: true });
  }, []);

  const onCross = useCallback(() => {
    axios
      .post(marksUrl.href, { [innerId]: 1 }, { withCredentials: true })
      .then(() => {
        deleteEvent && deleteEvent(innerId);
      });
  }, []);

  return (
    <span className="bg-white flex flex-col group hover:-translate-y-4 transition-all duration-300 overflow-hidden rounded-2xl isolate">
      <div className="relative overflow-hidden isolate">
        <img
          src={imageSrc}
          className="h-64 group-hover:scale-110 transition-all duration-300 object-top bg-slate-900 w-full -z-10 object-cover"
        />
        <span className="absolute group-hover:bg-violet-500 top-4 left-4 rounded-full bg-violet-600/60 font-bold px-5 py-2 text-white font-custom text-sm backdrop-blur-md uppercase letter tracking-wide">
          {category}
        </span>
      </div>

      <div className="flex flex-1 p-5 justify-between flex-col">
        <div className="mb-5">
          <p className="text-slate-500 mb-3">{date}</p>
          <h2 className="text-xl group-hover:text-purple-600 text-purple-500 font-bold font-custom">
            {title}
          </h2>
          <p className="text-slate-500">{location}</p>
          <button
            onClick={onLike}
            style={{ border: "1px solid black", padding: ".3em" }}
          >
            Лайк
          </button>
          <button
            onClick={onCross}
            style={{ border: "1px solid black", padding: ".3em" }}
          >
            Крест
          </button>
        </div>
        <p className="text-xl font-bold">${price}</p>
        {/* {+price === 0 && <p className="text-xl text-emerald-500 font-bold">Free</p>}
				{+price !== 0 && <p className="text-xl font-bold">${price}</p>} */}
      </div>
    </span>
  );
};

export default Event;
