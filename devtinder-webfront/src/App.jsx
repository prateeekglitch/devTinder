import React, { Profiler } from "react";
import NavBar from "./NavBar";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Profile from "./Profile";
import Body from "./Body";
import Login from "./Login";
import {Provider} from "react-redux";
import { store } from "./utils/appStore";
import Feed from "./Feed";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>

              <Route path="/feed" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}
