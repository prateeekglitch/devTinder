import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import UserCard from "./UserCard";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [previewUser, setPreviewUser] = useState(user || {});

  useEffect(() => {
    setPreviewUser(user || {});
  }, [user]);

  if (!user) return null;

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 px-4 md:px-10 py-6">
      <div className="md:w-1/2">
        <EditProfile
          user={user}
          onProfileChange={(updated) => setPreviewUser(updated)}
        />
      </div>
      <div className="md:w-1/2 flex justify-center">
        <UserCard user={previewUser} />
      </div>
    </div>
  );
};

export default Profile;
