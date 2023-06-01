import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import PostForm from '../postForm/PostForm';

const StudyGroup = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

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

  const handlePostSubmit = async (postText) => {
    if(token) {
      // Assume "/posts" is your API endpoint to create a new post.
      const response = await fetch('/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: postText }),
      });

      if (response.ok) {
        const newPost = await response.json();
        setPosts((prevPosts) => [newPost, ...prevPosts]);
      } else {
        // Handle error case
      }
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate('/login');
  };

  if(token) {
    return (
      <>
        <h2>Your Study Group Posts</h2>
        <button onClick={logout}>Logout</button>
        <PostForm handlePostSubmit={handlePostSubmit} />
        <div id='feed' role="feed">
        {posts && posts.map(
          (post) => (<Post post={post} key={post._id} />)
        )}
        </div>
      </>
    );
  } else {
    navigate('/signin');
  }
};

export default StudyGroup;
