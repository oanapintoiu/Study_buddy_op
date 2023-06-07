import React, { useState } from 'react';

const UserProfileForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const[username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, username: username, password: password, firstName: firstName, lastName: lastName, })
    })
    .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          setSuccessMessage("Your changes have been updated successfully.");

          // Clear the input fields
          setEmail("");
          setUsername("");
          setPassword("");
          setFirstName("");
          setLastName("");
        } else {
          setSuccessMessage("Changes failed, please try again.");
        }
      })
      .catch((error) => {
        setSuccessMessage("Changes failed, please try again.");
      });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handleFirstNameChange = (event) => {
    setUsername(event.target.value)
  }

  const handleLastNameChange = (event) => {
    setUsername(event.target.value)
  }


  const logout = () => {
    window.localStorage.removeItem("token");
    navigate('/login');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {successMessage && <p>{successMessage}</p>}
        <input placeholder="Email" id="email" type='text' value={email} onChange={handleEmailChange} />
        <input placeholder="Username" id="username" type='username' value={username} onChange={handleUsernameChange} />
        <input placeholder="Password" id="password" type='password' value={password} onChange={handlePasswordChange} />
        <input placeholder="First Name" id="firstName" type='firstName' value={firstName} onChange={handleFirstNameChange} />
        <input placeholder="Last Name" id="lastName" type='lastName' value={lastName} onChange={handleLastNameChange} />
        <input id='submit' type="submit" value="Submit" />
      </form>
     
    </>
  );
};

export default UserProfileForm;