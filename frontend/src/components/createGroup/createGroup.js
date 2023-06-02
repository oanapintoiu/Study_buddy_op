import React, { useEffect, useState } from 'react';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [subjectCategory, setSubjectCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  // const [level, setLevel] = useState('');
  // const [partySize, setPartySize] = useState(1);
  // const [groupType, setGroupType] = useState('private');
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if(token) {
      fetch("/create-group", {  // Add the group ID as a query parameter
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
        })
    }
  }, [token]);

  const handleCreateGroup = event => {
    event.preventDefault();

    fetch("/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name: groupName}) // Add the group ID when creating a new post
    })
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setGroupName([{ name: groupName }]);
      });
  };



  return (
    <div>
      <h2>Create Group</h2>
      <form onSubmit={handleCreateGroup}>
        <label>
          Study Group Name:
          <input
            type="text"
            value={groupName}
            onChange={(event) => setGroupName(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Subject Category:
          <select
            value={subjectCategory}
            onChange={(event) => setSubjectCategory(event.target.value)}
            required
          >
            <option value="">Select Category</option>
            {/* Render options dynamically from a database */}
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            {/* Add more options as needed */}
          </select>
        </label>
        <br />
        <label>
          Sub-Category:
          <select
            value={subCategory}
            onChange={(event) => setSubCategory(event.target.value)}
            required
          >
            <option value="">Select Sub-Category</option>
            {/* Render options dynamically based on selected subject category */}
            {/* You can conditionally render the sub-categories based on the selected subject category */}
            {subjectCategory === 'category1' && (
              <>
                <option value="subCategory1">Sub-Category 1</option>
                <option value="subCategory2">Sub-Category 2</option>
              </>
            )}
            {subjectCategory === 'category2' && (
              <>
                <option value="subCategory3">Sub-Category 3</option>
                <option value="subCategory4">Sub-Category 4</option>
              </>
            )}
            {/* Add more options as needed */}
          </select>
        </label>
        <br />
        <label>
          Level:
          <select
            value={level}
            onChange={(event) => setLevel(event.target.value)}
            required
          >
            <option value="">Select Level</option>
            <option value="0">0 - EARLY CHILDHOOD EDUCATION</option>
            <option value="1">1 - PRIMARY EDUCATION</option>
            <option value="2">2 - LOWER SECONDARY EDUCATION</option>
            <option value="3">3 - UPPER SECONDARY EDUCATION</option>
            <option value="4">4 - POST-SECONDARY NON-TERTIARY EDUCATION</option>
            <option value="5">5 - SHORT-CYCLE TERTIARY EDUCATION</option>
            <option value="6">6 - BACHELOR'S OR EQUIVALENT LEVEL</option>
            <option value="7">7 - MASTER'S OR EQUIVALENT LEVEL</option>
          </select>
        </label>
        <br />
        <label>
          Group Party Size:
          <select
            value={partySize}
            onChange={(event) => setPartySize(parseInt(event.target.value))}
          >
            {[...Array(10)].map((_, index) => (
              <option key={index} value={index + 1}>{index + 1}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Group Type:
          <select
            value={groupType}
            onChange={(event) => setGroupType(event.target.value)}
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
export default CreateGroup;