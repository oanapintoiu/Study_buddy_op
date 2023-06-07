import React, { useEffect, useState } from 'react';
import Post from '../post/Post'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [groups, setGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subjectCategory, setSubjectCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [level, setLevel] = useState('');
  const [groupType, setGroupType] = useState('private');
  useEffect(() => {
    if(token) {
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        setPosts(data.posts);
      })
    }
  }, [])
  useEffect(() => {
    if (token) {
      fetch("/groups", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        setGroups(data.groups);
      })
    }
  }, [token])

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
      setSubcategories(data.subcategories);
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

  const createGroup = () => {
    // Logic to handle creating a group and redirect to another page
    navigate('/create-group')
  }
  // Frontend code

const handleSearch = async () => {
  console.log(subjectCategory)
  console.log(subCategory)
  console.log(level)
  console.log(groupType)
  try {
    const response = await fetch('/groups/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        category: subjectCategory,
        subcategory: subCategory,
        level: level,
        groupType: groupType,
      }),
    });
    const data = await response.json();
    setGroups(data.groups);
    console.log(data.groups)
  } catch (error) {
    console.error('Error searching groups:', error);
  }
};

  
  if(token) {
    return (
      <>
        <h1>Homepage</h1>
        <div>
          <br></br>
          <button onClick={createGroup} style={{ fontSize: '18px', color: 'red' }}>Create a Study Group</button><br></br><br></br>
          <br></br><p>Search for a Study Group</p>
          <br></br>
          <label>
            Name:
            <input
              type="text"
            />
          </label>
          <br></br>
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
          <br></br>
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
          Group Type:
          <select value={groupType} onChange={(event) => setGroupType(event.target.value)}>
            <option value="">Select type</option>
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </label>
        <br />
          <br></br><br></br>
          <button onClick={handleSearch}>Search</button>
        </div>
        <div id='feed' role="feed">
          {groups.map((group) => (
            <div key={group._id}>{group.name}</div>
          ))}
          {posts.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
        
      </>
    )
  } else {
    navigate('/signin')
    return null;
    // consider returning something if the user is not logged in??
  }
}
export default Feed;