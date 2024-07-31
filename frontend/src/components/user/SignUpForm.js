import React, { useState } from "react";
import "./SignUpForm.css";

const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    if (avatar) {
      formData.append("avatar", avatar);
    }
    fetch("/users", {
      method: "post",
      body: formData,
    })
      .then((response) => {
        if (response.status === 201) {
          navigate("/login");
        } else {
          if (response.status === 400) {
            response.json().then((data) => {
              setError(data.message);
            });
          }
          navigate("/signup");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  return (
    <>
      <div className="background-signup"></div>
      <div className="login-container">
        <h1 className="study-buddy-heading studdybuddy-font">Study Buddy</h1>
        <p className="additional-text">Bazinga! Ready to meet Sheldon AI?</p>
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <input
              placeholder="Email"
              id="email"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
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
          <div className="input-container">
            <div className="input-group label-group">
              <span>Upload Photo</span>
            </div>
            <div className="input-group file-group">
              <input
                placeholder="Avatar"
                id="avatar-user"
                type="file"
                onChange={handleAvatarChange}
              />
            </div>
          </div>
          <input id="submit" type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
