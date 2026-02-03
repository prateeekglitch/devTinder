import React from "react";
import axios from "axios";
import { BASE_URL } from "./utils/constants";

const UserCard = ({ user, refreshFeed }) => {
  const { name, age, gender, photoUrl, about } = user;

  const handleAction = async (type) => {
    try {
      await axios.post(
        BASE_URL + `/request/send/${type}/${user._id}`,{},
        { withCredentials: true },
      );
     

      refreshFeed(); // load next user
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
      <figure className="h-80 overflow-hidden">
        <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
      </figure>

      <div className="card-body items-center text-center">
        <h2 className="card-title text-xl">{name}</h2>

        {age && gender && (
          <p className="text-sm opacity-70">
            {age} • {gender}
          </p>
        )}

        {about && <p className="text-sm mt-2">{about}</p>}

        <div className="card-actions justify-center gap-4 mt-4 w-full">
          <button
            className="btn btn-error flex-1"
            onClick={() => handleAction("ignored")}
          >
            Ignore
          </button>

          <button
            className="btn btn-success flex-1"
            onClick={() => handleAction("interested")}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
