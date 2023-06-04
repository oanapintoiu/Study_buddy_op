import React, { useState } from 'react';

const PostForm = ({ handlePostChange, handleSubmit, newPost, handleAskAI, loading }) => {
  const [postText, setPostText] = useState('');

  const submitForm = (event) => {
    event.preventDefault();
    handleSubmit(event);
    setPostText('');
  };

  const handleAskButtonClick = () => {
    handleAskAI(newPost);
    setPostText('');
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
      {loading && <p>Sheldon is thinking...</p>}
    </form>
  );
};

export default PostForm;
