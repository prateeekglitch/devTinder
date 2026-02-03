import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "./utils/constants"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
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
        return navigate("/feed")
    } catch (error) {
      setError(error?.response?.data || "something went wrong"); 
        console.log(error);
    }
  }

  const handleSignUp = async()=>{
    try {
     const res = await axios.post(BASE_URL+"/signup",{name, email, password},{withCredentials:true});
      dispatch(addUser(res.data.data));
      navigate("/feed");
    } catch (error) {
      console.log(error);
      
    }
  }


  return (
    <div className="flex justify-center my-10">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title justify-center text-xl">
            {isLoginForm ? "Login" : "SignUp"}
          </h2>
          {!isLoginForm && (
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Name</legend>
                <input
                  type="text"
                  className="input mt-3 p-2"
                  value={name}
                  placeholder="Type here"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </fieldset>
            </div>
          )}

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
            <button
              className="btn py-4 px-6 bg-yellow-600"
              onClick={isLoginForm ? handleLogin: handleSignUp}
            >
              {isLoginForm ? "Login" : "SignUp"}
            </button>
          </div>
          <p
            className="cursor-pointer hover:underline text-blue-200"
            onClick={() => setIsLoginForm((v) => !v)}
          >
            {isLoginForm
              ? "New User Sign Up here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

