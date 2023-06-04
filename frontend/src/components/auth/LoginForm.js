import React, { useState } from "react";

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

      const expirationDate = new Date();
      expirationDate.setDate(
        expirationDate.getDate() + 1 * 24 * 60 * 60 * 1000
      );

      let cookieValue =
        encodeURIComponent("token") + "=" + encodeURIComponent(data.token);
      cookieValue += "; expires=" + expirationDate.toUTCString();
      cookieValue += "; path=/"; // Optional: set the cookie path

      document.cookie = cookieValue;

      navigate("/profile");
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Username"
        id="username"
        type="text"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        placeholder="Password"
        id="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <input role="submit-button" id="submit" type="submit" value="Submit" />
    </form>
  );
};

export default LogInForm;
