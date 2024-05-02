import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./StudyGroup.css";
import Chat from "../chat/chat";
import Modal from "../budy/Modal";
import Budy from "../budy/Budy";

const StudyGroup = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState({});
  const [isMembersBoxOpen, setIsMembersBoxOpen] = useState(false);
  const [username, setUsername] = useState(
    window.localStorage.getItem("username")
  );

  useEffect(() => {
    if (token) {
      fetch("/groups/" + groupId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPosts(data.group.posts);
          setGroup(data.group);
          console.log("group: ", data.group);
        });
    }
  }, [token, groupId]);

  const handleMembersBoxToggle = () => {
    setIsMembersBoxOpen(!isMembersBoxOpen);
  };

  const handlePostChange = (event) => {
    setNewPost(event.target.value);
  };

  const handleMemberClick = (memberId) => {
    setSelectedMemberId(memberId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const leaveGroup = () => {
  
    fetch(`/groups/${groupId}/leave`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        userId: username,
        group: groupId
       })
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response if needed
        console.log(data);
        navigate(`/posts`)
      })
      .catch(error => {
        console.error('Error leaving group:', error);
        // Handle errors
      });
  };

  const deleteGroup = () => {
  
    fetch(`/groups/${groupId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response if needed
        console.log(data);
        navigate(`/posts`)
      })
      .catch(error => {
        console.error('Error deleting group:', error);
        // Handle errors
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("newPost: ", newPost);
    console.log("username: ", username);
    fetch("/groups/" + groupId + "/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: newPost,
        group: groupId,
        user: username,
      }), // Add the group ID when creating a new post
    })
      .then((response) => response.json())
      .then(async (data) => {
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setPosts([...posts, { message: newPost }]);
        setNewPost("");
      });
  };

  const handleAskAI = async (postText) => {
    setLoading(true);

    const response = await fetch("/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: postText,
      }),
    });

    const data = await response.json();

    const PostAI = {
      message: data.message,  // data directly contains the AI message.
      group: groupId, // Add the group ID when creating an AI post
      ai_question: postText.toString(),
    };

    fetch("/groups/" + groupId + "/postsAI", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(PostAI)  // Wrap newPostAI inside an object
    })
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setPosts([...posts, newPostAI]);
        setNewPost("");
      })
      .catch(error => {
        console.error('Error saving AI chat data:', error);
      });
    
    const newPostAI = {
      user: {
        username: "Sheldon AI",
        avatar:
          "https://res.cloudinary.com/dmkipvd8d/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1686121855/sheldon_640x480_41478610926_d6r4bh.jpg",
      },
      message: data.message,
    };

    setGroup((prevGroup) => ({
      ...prevGroup,
      posts: [...prevGroup.posts, newPostAI],
    }));
    setNewPost("");

    setLoading(false);
  };

  if (token) {
    return (
      <>
        <div className="group">{group.name}</div>
        <br />
        <div className={`members-panel ${isMembersBoxOpen ? "open" : ""}`}>
          <h3>Members</h3>
          {group.members && group.members.length > 0
            ? group.members.map((member, index) => (
              <p className="member" key={index} onClick={() => handleMemberClick(member._id)}>{member.username}</p>

              ))
            : null}
        </div>
        <button
          onClick={handleMembersBoxToggle}
          className="members-toggle-button"
        >
          {isMembersBoxOpen ? "Close Members" : "Open Members"}
        </button>
        <div id="feed" role="feed">
          {group.posts ? (
            <Chat
              posts={group.posts}
              username={username}
              handlePostChange={handlePostChange}
              handleSubmit={handleSubmit}
              newPost={newPost}
              handleAskAI={handleAskAI}
              loading={loading}
            />
          ) : null}
        </div>
       
        {isModalOpen && (
      <Modal onClose={handleCloseModal}>
        <Budy navigate={navigate} id={selectedMemberId}/>
      </Modal>
    )}
    <div className="leave-button-container">
  <button onClick={leaveGroup} className="leave-group-button">
    leave group
  </button>
</div>
<div className="delete-button-container">
          <button onClick={deleteGroup} className="delete-group-button">
            delete group
          </button>
        </div>
      </>
    );
  } else {
    navigate("/signin");
    return null; // Return null if not logged in to avoid rendering anything
  }
  
};

export default StudyGroup;
