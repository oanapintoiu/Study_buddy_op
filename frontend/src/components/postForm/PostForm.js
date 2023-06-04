import React, { useState } from 'react';

const PostForm = ({ handleSubmit, handleAskAI, loading }) => {
  const [postText, setPostText] = useState('');

  const submitForm = (event) => {
    event.preventDefault();
    handleSubmit(postText);
    setPostText('');
  };

  return (
    <form onSubmit={submitForm}>
      <textarea
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        placeholder="Ask your group or Sheldon a question!"
      />
      <button type="submit">Message Group</button>
      <button type="button" onClick={() => handleAskAI(postText)}>Ask Sheldon</button>
      {loading && <p>Sheldon is thinking...</p>}
    </form>
  );
};

export default PostForm;
