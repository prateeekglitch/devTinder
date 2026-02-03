import React from "react";

import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "./utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );

      dispatch(removeRequests(_id));
    } catch (error) {
      console.error("Review failed:", error.response?.data || error.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <h1 className="flex justify-center my-10 text-white text-xl">
        No Requests Found.
      </h1>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl mb-10 text-center">
        Connection Requests
      </h1>

      {requests.map((request) => {
        const { _id, fromUserId } = request;
        const { name, photoUrl, age, gender, about } = fromUserId || {};

        return (
          <div
            key={_id}
            className="flex m-4 p-4 bg-base-200 rounded-lg w-11/12 md:w-1/2 mx-auto shadow-lg border border-gray-700"
          >
            <div className="flex-shrink-0">
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={
                  photoUrl ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt="profile"
              />
            </div>

            <div className="text-left mx-6 flex flex-col justify-center flex-grow">
              <h2 className="font-bold text-2xl text-white">{name}</h2>
              {(age || gender) && (
                <p className="text-gray-300">
                  {age ? age : ""} {gender ? `• ${gender}` : ""}
                </p>
              )}
              <p className="mt-2 text-gray-400 italic text-sm line-clamp-2">
                {about}
              </p>
            </div>

            <div className="flex items-center ml-auto gap-4">
              <button
                className="btn btn-sm btn-error px-4"
                onClick={() => reviewRequest("rejected", _id)}
              >
                Reject
              </button>
              <button
                className="btn btn-sm btn-success px-4"
                onClick={() => reviewRequest("accepted", _id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;
