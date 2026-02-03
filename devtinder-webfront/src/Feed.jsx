import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { addFeed } from "./utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import UserCard from "./UserCard";
import React from "react";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async (force = false) => {
    if (feed && !force) return;

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length === 0) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-lg font-semibold">
        No profiles to show
      </div>
    );
  }

  const currentUser = feed[0];

  return (
    <div className="flex items-center justify-center min-h-[85vh] px-4">
      <UserCard user={currentUser} refreshFeed={() => getFeed(true)} />
    </div>
  );
};

export default Feed;
