import { useEffect, useState } from "react";
import axios from "../utils/axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/user/profile")
      .then(res => setUser(res.data))    
      .catch(err => console.error(err));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold">Profile</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
