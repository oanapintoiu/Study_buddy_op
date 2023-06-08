import { useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';

import './UserProfileForm.css';

const UserProfileForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);


  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const { id } = useParams();

  useEffect(() => {
    fetch(`/users/${id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          navigate('/profile');
        }
        return response.json();
      })
      .then((data) => {
        setEmail(data.email);
        setUsername(data.username);
        setFirstName(data.firstName);
        setLastName(data.lastName);
      });
  }, [id, navigate]);

    const handleSubmit = async (event) => {
      event.preventDefault();

    
      fetch('/users', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email, 
          username: username, 
          password: password, 
          firstName: firstName, 
          lastName: lastName, 
        })
      })
      .then((response) => {
        console.log('Response:', response);  // log the full response
        console.log('Response status:', response.status);
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
        console.log('Error:', error);  // log the error
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
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value)
  }


  return (
    <>
    <h1>Update Profile: {username}</h1>
    {/* <div className="dropdown-container" ref={dropdownRef}>
      <button onClick={() => { setDropdownVisible(true); setShowCloseButton(true); }}>User Info</button>
      {dropdownVisible && (
        <div className="dropdown-menu">
          <p>First Name: {firstName}</p>
          <p>Last Name: {lastName}</p>
          <p>Email: {email}</p>
          {showCloseButton && (
            <button onClick={() => { setDropdownVisible(false); setShowCloseButton(false); }}>Close</button>
          )}
        </div>
      )}
    </div> */}
      <form onSubmit={handleSubmit}>
        {successMessage && <p>{successMessage}</p>}
        <input placeholder="Email" id="email" type='text' value={email} onChange={handleEmailChange} />
        <input placeholder="Username" id="username" type='username' value={username} onChange={handleUsernameChange} />
        <input placeholder="Password" id="password" type='password' value={password} onChange={handlePasswordChange} />
        <input placeholder="First Name" id="firstName" type='text' value={firstName} onChange={handleFirstNameChange} />
        <input placeholder="Last Name" id="lastName" type='text' value={lastName} onChange={handleLastNameChange} />
        <input id='submit' type="submit" value="Update" />
      </form>
    </>
  );
};

export default UserProfileForm;