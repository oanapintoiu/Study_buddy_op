import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import './StudyGroup.css';
import Chat from '../chat/chat';

const StudyGroup = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [username, setUsername] = useState(window.localStorage.getItem("username"));
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState({});
  const [isMembersBoxOpen, setIsMembersBoxOpen] = useState(false);

  useEffect(() => {
    if (token) {
      fetch("/groups/" + groupId , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPosts(data.group.posts);
          setGroup(data.group);
          console.log("group: ",data.group);
        })
    }
  }, [token, groupId]);

  const handleMembersBoxToggle = () => {
    setIsMembersBoxOpen(!isMembersBoxOpen);
};

  const handlePostChange = event => {
    setNewPost(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log("newPost: ", newPost)
    fetch("/groups/" + groupId + "/posts", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ message: newPost, group: groupId, user: username}) // Add the group ID when creating a new post
    })
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setPosts([...posts, { message: newPost }]);
        setNewPost("");
      });
  };

  const handleAskAI = async (postText) => {
    setLoading(true);
  
    const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
        prompt: postText,
        max_tokens: 600
      })
    });
  
    const data = await response.json();
    if (!data.choices || data.choices.length === 0) {
      console.error("Unexpected response from OpenAI API:", data);
      return;
    }
    console.log(data)
    const newPostAI = {
      user: { username: "Sheldon AI", avatar: "https://res.cloudinary.com/dmkipvd8d/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1686121855/sheldon_640x480_41478610926_d6r4bh.jpg" },
      message: data.choices[0].text
    };
    setGroup(prevGroup => ({...prevGroup, posts: [...prevGroup.posts, newPostAI]}));

    //setPosts([...posts, { message: newPostAI }]);

    setNewPost('');
    setLoading(false);
  };  

  if (token) {
    return (
      <>
    
    <div className="group">{group.name}</div>
    <br />
    <div className={`members-panel ${isMembersBoxOpen ? 'open' : ''}`}>
            <h3>Members</h3>
            {group.members && group.members.length > 0 ? group.members
  .map((member, index) => (
    <p className='member' key={index} onClick={() => navigate(`/users/${member._id}`)}>{member.username}</p>
)) : null}
        </div>
        <button onClick={handleMembersBoxToggle} className="members-toggle-button">
            {isMembersBoxOpen ? 'Close Members' : 'Open Members'}
        </button>
        <div id='feed' role="feed">
        {group.posts ?
           (<Chat posts={group.posts}
            username={username}
            handlePostChange={handlePostChange}
            handleSubmit={handleSubmit}
            newPost={newPost}
            handleAskAI={handleAskAI}
            loading={loading}
           
           />) : null}
        </div>
        {/* <PostForm
          handlePostChange={handlePostChange}
          handleSubmit={handleSubmit}
          newPost={newPost}
          handleAskAI={handleAskAI}
          loading={loading}
        /> */}
      </>
    )
  } else {
    navigate('/signin');
    return null; // Return null if not logged in to avoid rendering anything
  }
};

export default StudyGroup;
