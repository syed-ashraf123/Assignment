import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";
function Dashboard() {
  const [name, setName] = useState("Loading...");
  const [email, setEmail] = useState("Loading...");
  const [logouts, setLogouts] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user-auth-token") != null) {
      const token = localStorage.getItem("user-auth-token");
      let config = {
        headers: {
          "user-auth-token": token,
        },
      };
      Axios.get("http://localhost:4000/dashboard", config)
        .then((response) => {
          console.log(response);
          console.log(response.data.msg);
          setName(response.data.msg.firstname);
          setEmail(response.data.msg.email);

          //   setSuccess(true);
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data.msg);
          //   setStatus(error.response.data.msg);

          window.scrollTo(0, 0);
        });
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("user-auth-token");
    setLogouts(true);
  };
  return (
    <div>
      {localStorage.getItem("user-auth-token") ? null : (
        <Redirect to="/login" />
      )}
      {logouts ? <Redirect to="/login" /> : null}
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
      <h1>Name : {name}</h1>
      <h1>Email: {email}</h1>
    </div>
  );
}

export default Dashboard;
