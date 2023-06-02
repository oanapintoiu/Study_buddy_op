//import React from 'react';
import './Sidebar.css';

import React, { useEffect, useState } from "react";

const Sidebar = () => {
  
  return(

<div className="sidebar">
  <div className="username"> Username </div>
  <a href="#" className="side-bar-item"><i className="fa fa-user"></i> Profile</a>
  <div className="dropdown">
    <div className="dropbtn"><i className="fa fa-tools"></i> Tools</div>
    <div className="dropdown-content">
      <a href="#">Miro</a>
      <a href="#">Zoom</a>
      <a href="#">Trello</a>
      <a href="#">Excalidraw</a>
    </div>
  </div>
  <br />
  <div className="study-groups">
    <div className="group-title"><i className="fa-solid fa-user-group"></i> Study Groups</div>
    <div className="group-list">
      <a href="#">Group 1</a>
      <a href="#">Group 2</a>
      <a href="#">Group 3</a>
      <a href="#">Group 4</a>
      <a href="#">Group 5</a>
      <a href="#">Group 6</a>
      <a href="#">Group 7</a>
    </div>
  </div>
  <br />
  <a href="#" className="side-bar-item"><i className="fa fa-sign-out-alt"></i> Logout</a>
</div>

  )
}

export default Sidebar;
//<article data-cy="post" key={ post._id }>{ post.message }</article>