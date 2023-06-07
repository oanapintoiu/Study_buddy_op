import React, { useState } from 'react';

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const[username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const[error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    if (avatar) {
      formData.append('avatar', avatar);
    }
    fetch( '/users', {
      method: 'post',
      body: formData
    })
    .then((response) => {
      if (response.status === 201) {
        navigate('/login');
      } else {
        if (response.status === 400) {
          response.json().then((data) => {
            setError(data.message);
          });
        }
        navigate('/signup');
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
    //console.log(event.target.files[0]);

  }


    return (
      <form onSubmit={handleSubmit}>
          <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder="Username" id="username" type='username' value={ username } onChange={handleUsernameChange} />
          <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
          <label htmlFor='avatar'>Avatar (optional):</label>
          <input id='avatar' type='file' onChange={handleAvatarChange} />
          
          <div id="error-message">{error}</div>


        <input id='submit' type="submit" value="Submit" />
      </form>
    );
}

export default SignUpForm;
