import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import "./Budy.css";

const Budy = ({ navigate, id }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch(`/users/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log("yay");
          navigate("/login");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data.user);
      });
  }, [id]);

  if (user !== "") {
    return (
      <div className="user-profile-card">
        <Avatar
          id="logo"
          src={user.avatar}
          sx={{
            width: 150,
            height: 150,
            right: 40,
            top: 40,
            position: "absolute",
          }}
        />
        <h2 className="user-fullname">{`${
          user.firstName ? user.firstName : ""
        } ${user.lastName ? user.lastName : ""}`}</h2>
        <h3 className="user-username">{user.username}</h3>
        <p className="user-email">{user.email}</p>
        <h3 className="groups-title">Groups</h3>
        <ul className="user-groups">
          {user.groups.map((group) => (
            <li key={group.name} className="group-name">
              {group.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default Budy;
