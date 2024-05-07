import React, { useState } from "react";
import "./PostForm.css";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const PostForm = ({
  handlePostChange,
  handleSubmit,
  newPost,
  handleAskAI,
  loading,
}) => {
  const handleAskButtonClick = () => {
    handleAskAI(newPost);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={newPost}
        onChange={handlePostChange}
        placeholder="Ask your group or Sheldon a question!"
      />
      <button type="submit">Post to the group</button>
      <button type="button" onClick={handleAskButtonClick}>
        Ask Sheldon AI
      </button>
      {loading && <p>Sheldon is thinking...</p>}
    </form>
  );
};

export default PostForm;
// const PostForm = ({ handlePostChange, handleSubmit, newPost, handleAskAI, loading }) => {

//   return (
//     <form onSubmit={submitForm}>
//       <div className="textarea-wrapper">
//         <textarea
//           value={newPost}
//           onChange={handlePostChange}
//           placeholder="Ask your group or Sheldon a question!"

//         />
//         <Button className='sendButton' type="submit" variant="text" onClick={handleAskButtonClick} endIcon={<SendIcon />} >
//         </Button>
//       </div>
//            <button className="feedButton" type="button" onClick={handleAskButtonClick}>Ask Sheldon AI</button>
//       {loading && <p>Sheldon is thinking...</p>}
//     </form>
//   );
// };

// export default PostForm;
