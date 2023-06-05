import React, { useState, useEffect } from 'react';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [subjectCategory, setSubjectCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [level, setLevel] = useState('');
  const [partySize, setPartySize] = useState(1);
  const [groupType, setGroupType] = useState('private');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem('token'));

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
      setSubcategories(data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSubjectCategory(selectedCategory);
    setSubCategory('');
    fetchSubcategories(selectedCategory); // Call fetchSubcategories after updating subjectCategory
  };

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
          Authorization: `Bearer ${token}`,
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
          <input type="text" value={groupName} onChange={(event) => setGroupName(event.target.value)} required />
        </label>
        <br />
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
        <br />
        <label>
          Group Party Size:
          <select value={partySize} onChange={(event) => setPartySize(parseInt(event.target.value))}>
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
          <select value={groupType} onChange={(event) => setGroupType(event.target.value)}>
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
