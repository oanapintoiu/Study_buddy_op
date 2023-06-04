import React, { useState } from 'react';

const PostForm = ({ handlePostChange, handleSubmit, newPost }) => {
    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={newPost}
                onChange={handlePostChange}
                placeholder="Ask your group or Sheldon a question!"
            />
            <button type="submit">Submit</button>
        </form>
    );
};


export default PostForm;
