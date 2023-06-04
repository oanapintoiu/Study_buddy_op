import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import PostForm from '../postForm/PostForm';
import { useParams, useNavigate } from "react-router-dom";

const StudyGroup = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if(token) {
      fetch("/groups/" + groupId + "/posts", {  
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPosts(data.posts);
        })
    }
  }, [token, groupId]);

  const handlePostChange = event => {
    setNewPost(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    fetch("/groups/" + groupId + "/posts", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ message: newPost, group: groupId }) // Add the group ID when creating a new post
    })
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setPosts([ ...posts, { message: newPost }]);
        setNewPost("");
      });
  };

  const handleAskAI = async (postText) => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        prompt: postText,
        max_tokens: 60
      })
    });
    
    const data = await response.json();
    
    // Do something with the response data
    console.log(data.choices[0].text);
  };  

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate('/login');
  };
  
  if(token) {
    return(
      <>
        <h2>Your Study Group Posts</h2>
        <button onClick={logout}>
          Logout
        </button>
        <div id='feed' role="feed">
            {posts.map((post, index) => ( <Post post={post} key={index} /> ))}
        </div>
        <PostForm handlePostChange={handlePostChange} handleSubmit={handleSubmit} newPost={newPost} handleAskAI={handleAskAI} />
      </>
    )
  } else {
    navigate('/signin');
  }
};

export default StudyGroup;
