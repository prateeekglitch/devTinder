import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "./utils/constants"


const Login = () => {
  const [email, setEmail] = useState("prat2@gmail.com");
  const [password, setPassword] = useState("pratprat");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("")

  const handleLogin = async()=>{
    try {
        const res = await axios.post(BASE_URL+"/login", {
            email, password,
        },{withCredentials:true});
        console.log(res.data)
        dispatch(addUser(res.data));
        return navigate("/")
    } catch (error) {
      setError(error?.response?.data || "something went wrong"); 
        console.log(error);
    }
  }
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title justify-center text-xl">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Id</legend>
              <input
                type="text"
                className="input mt-3 p-2"
                value={email}
                placeholder="Type here"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                className="input mt-3 p-2"
                value={password}
                placeholder="Type here"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>

          <div className="card-actions justify-center">
            <button className="btn py-4 px-6 bg-yellow-600" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
