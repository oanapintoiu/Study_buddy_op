import React, { useState } from 'react';

const PostForm = ({ handlePostChange, handleSubmit, newPost, handleAskAI, loading }) => {
  const handleAskButtonClick = () => {
    handleAskAI(newPost); // You pass newPost into handleAskAI here
  };

  return (
    <form onSubmit={handleSubmit}>
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
