//import React from 'react';
import './Sidebar.css';
import Logout from '../auth/Logout';
import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import SidebarGroups from './SibebarGroups';

const Sidebar = ({navigate}) => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setUsername(window.localStorage.getItem("username"))
    setAvatar(window.localStorage.getItem("avatar"))
  })

  const logout = () => Logout({navigate})

  
  return(
    

<div className="sidebar">
<Avatar
              id="logo"
              alt="Remy Sharp"
              src={avatar}
              sx={{ width: 56, height: 56 }}
            />
            <br />
  <div className="username">{username}</div>
  <a href="/posts" className="side-bar-item"><i className="fa fa-home"></i> Home</a>

  <a href="/profile" className="side-bar-item"><i className="fa fa-user"></i> Profile</a>
  
  <div className="dropdown">
    <div className="dropbtn"><i className="fa fa-tools"></i> Tools</div>
    <div className="dropdown-content">
      <a target="_blank" href="https://miro.com/">Miro</a>
      <a target="_blank"href="https://zoom.us/">Zoom</a>
      <a target="_blank"href="https://trello.com/">Trello</a>
      <a target="_blank"href="https://excalidraw.com/">Excalidraw</a>
      <a target="_blank"href="https://pomofocus.io/">Pomodoro</a>
    </div>
  </div>
  <br />
  <div className="study-groups">
    <div className="group-title"><i className="fa-solid fa-user-group"></i> Study Groups</div>
    <div className="group-list">
      <SidebarGroups username={username}/>
    </div>
  </div>
  <br />
  <a href="#" onClick={logout} className="side-bar-item"><i className="fa fa-sign-out-alt"></i> Logout</a>
</div>

  )
}

export default Sidebar;
