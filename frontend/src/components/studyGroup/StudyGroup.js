import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import { useParams } from "react-router-dom";

const StudyGroup = ({ navigate }) => {
  const { groupId } = useParams();
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if(token) {
      fetch(`/groups/${groupId}/posts`, {
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
  }, [groupId, token])

  if(token) {
    return(
      <>
        <h2>Group Posts</h2>
        <div id='group' role="group">
            {posts.map(
              (post) => ( <Post post={ post } key={ post._id } /> )
            )}
        </div>
      </>
    )
  } else {
    navigate('/signin')
  }
}

export default StudyGroup;
