import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { addUser } from "./utils/userSlice";

const EditProfile = ({ user, onProfileChange = () => {} }) => {
 
  const [name, setName] = useState(user?.name || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [error, setError] = useState("");

  
  const dispatch = useDispatch();
  if (!user) return <div className="text-center mt-10">Loading...</div>;


  const saveProfile = async () => {
    setError("");

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { name, photoUrl, age, gender, about },
        { withCredentials: true },
      );

      const updatedUser = res?.data?.data;

      if (!updatedUser) {
        setError("Failed to update profile");
        return;
      }

      dispatch(addUser(updatedUser));
      onProfileChange(updatedUser);

      window.showToast("Profile updated successfully");
    } catch (err) {
      setError(err?.response?.data || "Profile update failed");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card bg-neutral text-neutral-content w-96 shadow-xl">
        <div className="card-body">
          <h2 className="text-xl font-semibold text-center mb-4">
            Edit Profile
          </h2>

          <fieldset className="fieldset space-y-2">
            <legend className="fieldset-legend">Name</legend>
            <input
              className="input input-bordered w-full mt-1"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                onProfileChange({ ...user, name: e.target.value });
              }}
            />
          </fieldset>

          <fieldset className="fieldset space-y-2">
            <legend className="fieldset-legend">Photo URL</legend>
            <input
              className="input input-bordered w-full mt-1"
              value={photoUrl}
              onChange={(e) => {
                setPhotoUrl(e.target.value);
                onProfileChange({ ...user, photoUrl: e.target.value });
              }}
            />
          </fieldset>

          <fieldset className="fieldset space-y-2">
            <legend className="fieldset-legend">Age</legend>
            <input
              className="input input-bordered w-full mt-1"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
                onProfileChange({ ...user, age: e.target.value });
              }}
            />
          </fieldset>

          <fieldset className="fieldset space-y-2">
            <legend className="fieldset-legend">Gender</legend>
            <select
              className="select select-bordered w-full mt-1"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
                onProfileChange({ ...user, gender: e.target.value });
              }}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </fieldset>

          <fieldset className="fieldset space-y-2">
            <legend className="fieldset-legend">About</legend>
            <input
              className="input input-bordered w-full mt-1"
              value={about}
              onChange={(e) => {
                setAbout(e.target.value);
                onProfileChange({ ...user, about: e.target.value });
              }}
            />
          </fieldset>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            onClick={saveProfile}
            className="btn bg-indigo-500 hover:bg-indigo-600 text-white w-full mt-4"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
