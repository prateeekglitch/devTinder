import React from "react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { addUser } from "./utils/userSlice";


const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(!user);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        setChecking(false);
        return;
      }
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch (err) {
        console(err)
        setChecking(false);
      } finally {
        setChecking(false);
      }
    };

    fetchUser();
  }, [user, dispatch]);

  if (checking) return null;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;

