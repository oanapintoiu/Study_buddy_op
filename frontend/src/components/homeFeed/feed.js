import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import './feed.css'
import GroupCard from './GroupCard';
import { Grid } from "@mui/material";


const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [username, setUsername] = useState(window.localStorage.getItem("username"));
  const [groups, setGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subjectCategory, setSubjectCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [level, setLevel] = useState('');
  const [groupType, setGroupType] = useState('private');
  const [name, setName] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null);
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
  }, [token])
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

  const handleSearch = (value) => {
    clearTimeout(searchTimeout); // Clear previous timeout
    const timeout = setTimeout(() => {
      performSearch(value);
    }, 10); // Set a delay of 500 milliseconds before performing the search
    setSearchTimeout(timeout);
  };

  const performSearch = async (value) => {
    try {
      // Perform the search request here
      // Use the updated value from the input field
      console.log(value);

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
          name: value,
        }),
      });

      const data = await response.json();
      setGroups(data.groups);
      console.log(data.groups);
    } catch (error) {
      console.error('Error searching groups:', error);
    }
  };

  
  const joinGroup = (groupId) => {
  
    // Send a request to the backend to join the group
    fetch(`/groups/${groupId}/join`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: username })
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response if needed
        console.log(data);
        handleSearch()
        navigate(`/groups/${groupId}`)
      })
  };
  
  if(token) {
    return (
      <>
        <h1>Homepage</h1>
        <div>
          <br></br>
          <button onClick={createGroup}>Create a Study Group</button><br></br><br></br>
          <br></br><p>Search for a Study Group</p>
          <br></br>
          <label>
            Name:
            <input
              type="text"
              onChange={(event) => {
                setName(event.target.value);
                handleSearch(event.target.value);
              }}
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
          <button onClick={() => handleSearch(name)}>Search</button>
        </div>
        <div id='feed' role="feed">
        <Grid container spacing={3}>
      {groups.map((group) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={group._id}>
          <GroupCard group={group} onJoin={joinGroup}/>
        </Grid>
      ))}
    </Grid>
          {posts.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
      </>
    );
    
  } else {
    navigate('/signin')
    return null;
    // consider returning something if the user is not logged in??
  }
}
export default Feed;