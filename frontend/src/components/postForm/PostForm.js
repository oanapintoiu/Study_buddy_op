import React, { useState } from 'react';

const PostForm = ({ handleSubmit, handleAskAI }) => {
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
            <button type="submit">Submit</button>
            <button type="button" onClick={() => handleAskAI(postText)}>Ask AI</button>
        </form>
    );
};

export default PostForm;

