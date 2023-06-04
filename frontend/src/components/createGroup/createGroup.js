import React, { useState } from 'react';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [subjectCategory, setSubjectCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [level, setLevel] = useState('');
  const [partySize, setPartySize] = useState(1);
  const [groupType, setGroupType] = useState('private');
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleCreateGroup = async (event) => {
    event.preventDefault();

    try {
      const groupData = {
        name: groupName,
        category: subjectCategory,
        subcategory: subCategory,
        level: level,
        partySize: partySize,
        groupType: groupType,
      };

      const response = await fetch('/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the authorization token in the request headers
        },
        body: JSON.stringify(groupData),
      });

      if (response.ok) {
        // Group creation was successful
        // Handle any necessary logic or show a success message
      } else if (response.status === 401) {
        throw new Error('Unauthorized: Please log in');
      } else {
        throw new Error('Error creating group');
      }
    } catch (error) {
      console.error('Error creating group:', error);
      // Handle the unauthorized error here, e.g., redirect to login page
    }
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
            <option value='647a0d6037c214801c7534bc'>Science, Technology, Engineering, and Mathematics (STEM)</option>
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
            {subjectCategory === '647a0d6037c214801c7534bc' && (
              <>
                <option value='647a0d6037c214801c7534dc'>Nanotechnology</option>
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
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
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
};

export default CreateGroup;
