import React, { useEffect, useState } from "react";
import axios from "axios";

const GoogleDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/auth/user", { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = () => {
    window.location.href = "http://localhost:5000/auth/logout";
  };
  console.log(user?.avatar)
  if (!user) return <p>Not logged in</p>;

  return (
    <div className="text-black max-w-3xl mx-auto p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Welcome {user.name}</h1>
      <h1 className="text-xl"> {user.email}</h1>
      <img className="rounded-full w-32 h-32" src={`${user.avatar}`} alt="profile" />
      <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 hover:scale-105 transition" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default GoogleDashboard;
