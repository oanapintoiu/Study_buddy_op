import React, { useState } from 'react';

const PostForm = ({ handlePostSubmit }) => {
    const [postText, setPostText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        handlePostSubmit(postText);
        setPostText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Ask your group or Sheldon a question!"
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default PostForm;
