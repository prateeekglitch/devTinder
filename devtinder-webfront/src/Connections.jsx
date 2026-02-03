import React, { useEffect } from "react";
import { BASE_URL } from "./utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "./utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log("Connections mounted");
    fetchConnections();
  }, []);

  if (!connections) {
    return <h1 className="text-white text-center mt-10">Loading...</h1>;
  }

  if (connections.length === 0) return <h1> No Connections Found.</h1>;

  return (
    <div className=" text-center my-10">
      <h1 className="text-bold text-white text-2xl">Connections</h1>
      {connections.map((connection) => {
        const { _id, name, photoUrl, age, gender, about } = connection;
        return (
          <div
            key={_id}
            className=" flex m-4 p-4 bg-base-200 rounded-lg w-1/2 mx-auto"
          >
            <div>
              <img
                className="w-50 h-50 rounded-full"
                src={photoUrl}
                alt="pfp"
              />
            </div>

            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">{name}</h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
