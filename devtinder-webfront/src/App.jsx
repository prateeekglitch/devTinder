import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";

import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";
import Feed from "./Feed";
import EditProfile from "./EditProfile";
import ProtectedRoute from "./ProtectedRoute";
import Toast from "./Toast"; // ✅ ADD THIS

import { store } from "./utils/appStore";
import Requests from "./Requests";
import Connections from "./Connections";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        {/* ✅ TOAST LIVES AT APP LEVEL */}
        <Toast />

        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />

            <Route
              path="/feed"
              element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/connections"
              element={
                <ProtectedRoute>
                  <Connections />
                </ProtectedRoute>
              }
            />

            <Route
              path="/requests"
              element={
                <ProtectedRoute>
                  <Requests />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/feed" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
