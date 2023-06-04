import React, { useState } from 'react';

const PostForm = ({ handlePostChange, handleSubmit, newPost, handleAskAI, loading }) => {
  const [postText, setPostText] = useState('');

  const submitForm = (event) => {
    event.preventDefault();
    handleSubmit(event);
    setPostText('');
  };

  const handleAskButtonClick = () => {
    handleAskAI(newPost); // Pass the newPost value to handleAskAI
  };

  return (
    <form onSubmit={submitForm}>
      <textarea
        value={newPost}
        onChange={handlePostChange}
        placeholder="Ask your group or Sheldon a question!"
      />
      <button type="submit">Post to the group</button>
      <button type="button" onClick={handleAskButtonClick}>Ask Sheldon AI</button>
      {loading && <p>Loading...</p>}
    </form>
  );
};

export default PostForm;
