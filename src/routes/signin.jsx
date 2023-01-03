import axios from "axios";
import React, { useCallback, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { REST_URL } from "../config";

const Signin = (props) => {
  const {} = props;

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const valuesRef = useRef({
    phone: "",
    pswd: "",
  });

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (
        Object.entries(valuesRef.current).some(([name, value]) => {
          if (value === "") {
            setError(`${name} must not be empty`);
            return true;
          }
        })
      ) {
        return;
      }

      sendValues(valuesRef.current);
    },
    [valuesRef]
  );

  const handleChange = useCallback(
    (event) => {
      if (event.target?.name) {
        valuesRef.current[event.target.name] = event.target.value;
      }
    },
    [valuesRef]
  );

  const sendValues = useCallback((values) => {
    const url = new URL("loginform", REST_URL);

    axios
      .post(url.href, values, { withCredentials: true })
      .then(() => navigate("/events"))
      .catch((e) => {
        if (axios.isAxiosError(e)) setError(e.response?.data?.msg);
        else setError("Internal server error");
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl font-custom font-bold text-center">
            Login
          </h1>
          <form onSubmit={handleSubmit}>
            <span>{error}</span>

            <input
              onChange={handleChange}
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="phone"
              placeholder="Phone"
            />

            <input
              onChange={handleChange}
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="pswd"
              placeholder="Password"
            />

            <button
              type="submit"
              className="bg-purple-500 text-white w-full px-4 py-3 rounded-xl"
            >
              Login
            </button>
          </form>

          <div className="text-center text-sm text-grey-dark mt-4">
            {"By signing up, you agree to the "}
            <Link to={"#"}>
              <span className="no-underline border-b border-grey-dark text-grey-dark">
                Terms of Service
              </span>
            </Link>
            {" and "}
            <Link to={"#"}>
              <span className="no-underline border-b border-grey-dark text-grey-dark">
                Privacy Policy
              </span>
            </Link>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          {"Don't have an account? "}
          <Link to={"/signup"}>
            <span className="no-underline border-b border-blue text-blue">
              Sign up.
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
