import React, { useState } from "react";
import "./LoginForm.css";
const LogInForm = ({ navigate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/tokens", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });

    if (response.status !== 201) {
      console.log("yay");
      navigate("/login");
    } else {
      console.log("oop");

      let data = await response.json();
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("username", username);

      let avatarResponse = await fetch(`/users/${username}/avatars`);
      let avatarData = await avatarResponse.json();
      window.localStorage.setItem("avatar", avatarData.avatar);

      const expirationDate = new Date();
      expirationDate.setDate(
        expirationDate.getDate() + 1 * 24 * 60 * 60 * 1000
      );

      let cookieValue =
        encodeURIComponent("token") + "=" + encodeURIComponent(data.token);
      cookieValue += "; expires=" + expirationDate.toUTCString();
      cookieValue += "; path=/";

      document.cookie = cookieValue;

      navigate("/posts");
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <div className="background-login"></div>

      <div className="login-container">
        <h1 className="study-buddy-heading studdybuddy-font">Study Buddy</h1>
        <p className="additional-text">
            The Big Bang of Learning!
        </p>
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <input
              placeholder="Username"
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="input-group">
            <input
              placeholder="Password"
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <input
            role="submit-button"
            id="submit"
            type="submit"
            value="Log in"
          />
        </form>
        <button
          className="create-account-button"
          onClick={() => navigate("/signup")}
        >
          Create new account
        </button>
      </div>
    </>
  );
};

export default LogInForm;
