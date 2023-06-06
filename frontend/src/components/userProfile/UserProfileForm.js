import React, { useState, useEffect } from 'react';

const UserProfileForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [subjectCategory, setSubjectCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [level, setLevel] = useState('');
  const [token, setToken] = useState(window.localStorage.getItem('token'));

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

    fetch('/groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ category: subjectCategory, subcategory: subCategory, level: level,}),
    })
      .then((response) => {
        if (response.ok) {
          setSuccessMessage("Preferences updated successfully");

        } else {
          setSuccessMessage("Error encountered in setting preferences");
        }
      })
      .catch((error) => {
        setSuccessMessage("Error encountered in setting preferences");
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubcategories = async (selectedCategory) => {
    try {
      const response = await fetch(`/categories/${selectedCategory}/subcategories`);
      const data = await response.json();
      console.log("selectedCategory: ",data);
      setSubcategories(data.subcategories);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSubjectCategory(selectedCategory);
    setSubCategory('');
    fetchSubcategories(selectedCategory);
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
      <button onClick={logout}>Logout</button>
      <label>
        Subject Category:
        <select value={subjectCategory} onChange={handleCategoryChange} required>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <br />
        <label>
          Sub-Category:
          <select value={subCategory} onChange={(event) => setSubCategory(event.target.value)} required>
            <option value="">Select Sub-Category</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Level:
          <select value={level} onChange={(event) => setLevel(event.target.value)} required>
            <option value="">Select Level</option>
            <option value="novice">NOVICE</option>
            <option value="intermediate">INTERMEDIATE</option>
            <option value="proficient">PROFICIENT</option>
            <option value="advanced">ADVANCED</option>
            <option value="expert">EXPERT</option>
          </select>
        </label>
    </>
  );
};

export default UserProfileForm;
