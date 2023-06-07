import React, { useEffect, useState } from 'react';
import Post from '../post/Post'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [groups, setGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState({
    isPublic: '',
    name: '',
    category: '',
    subCategory: '',
    level: '',
  });
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
  const createGroup = () => {
    // Logic to handle creating a group and redirect to another page
    navigate('/create-group')
  }
  const handleSearch = () => {
    const filteredGroups = groups.filter(group =>
      (searchFilter.isPublic === '' || group.isPublic === searchFilter.isPublic) &&
      (searchFilter.name === '' || group.name.toLowerCase().includes(searchFilter.name.toLowerCase())) &&
      (searchFilter.category === '' || group.category.toLowerCase().includes(searchFilter.category.toLowerCase())) &&
      (searchFilter.subCategory === '' || group.subCategory.toLowerCase().includes(searchFilter.subCategory.toLowerCase())) &&
      (searchFilter.level === '' || group.level === searchFilter.level)
    );
    setGroups(filteredGroups);
  }
  const joinGroup = (groupId) => {
    // Retrieve the user ID from the cookie
    const cookies = document.cookie.split("; ");
    let currentUserId = '';
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === "userId") {
        currentUserId = cookie[1];
        break;
      }
    }
  
    // Send a request to the backend to join the group
    fetch(`/groups/${groupId}/join`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: currentUserId })
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response if needed
        console.log(data);
      })
  };
  
  if(token) {
    return (
      <>
        <h1>Homepage</h1>
        <div>
          <br></br>
          <button onClick={createGroup} style={{ fontSize: '18px', color: 'red' }}>Create a Study Group</button><br></br><br></br>
          <br></br><p>Search for a Study Group</p>
          <label>
            Public/Private:
            <select
              value={searchFilter.isPublic}
              onChange={(event) => setSearchFilter({ ...searchFilter, isPublic: event.target.value })}
            >
              <option value="">All</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </label>
          <br></br>
          <label>
            Name:
            <input
              type="text"
              value={searchFilter.name}
              onChange={(event) => setSearchFilter({ ...searchFilter, name: event.target.value })}
            />
          </label>
          <br></br>
          <label>
            Category:
            <input
              type="text"
              value={searchFilter.category}
              onChange={(event) => setSearchFilter({ ...searchFilter, category: event.target.value })}
            />
          </label>
          <br></br>
          <label>
            Sub-Category:
            <input
              type="text"
              value={searchFilter.subCategory}
              onChange={(event) => setSearchFilter({ ...searchFilter, subCategory: event.target.value })}
            />
          </label>
          <br></br>
          <label>
            Level:
            <input
              type="text"
              value={searchFilter.level}
              onChange={(event) => setSearchFilter({ ...searchFilter, level: event.target.value })}
            />
          </label>
          <br></br><br></br>
          <button onClick={handleSearch}>Search</button>
        </div>
        <div id='feed' role="feed">
          {groups.map((group) => (
            <div key={group._id}>
              {group.name}
              <button onClick={() => joinGroup(group._id)}>Join</button>
            </div>
          ))}
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