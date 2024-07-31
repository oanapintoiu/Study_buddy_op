import React, { useState, useRef, useEffect } from "react";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Fab from "@mui/material/Fab";
import SendIcon from "@mui/icons-material/Send";

const Chat = ({
  posts,
  username,
  handlePostChange,
  handleSubmit,
  newPost,
  handleAskAI,
  loading,
}) => {
  const [postText, setPostText] = useState("");
  const messagesEndRef = useRef(null);

  const submitForm = (event) => {
    handleSubmit(event);
    setPostText("");
  };

  const handleAskButtonClick = () => {
    handleAskAI(newPost);
    setPostText("");
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [posts]);

  const getDefaultUser = () => {
    return {
      username: "Sheldon AI",
    };
  };

  return (
    <div>
      <Grid container style={{ paddingLeft: "57px" }}>
        <Grid container component={Paper} className="chatSection">
          <Grid item xs={12}>
            <List className="messageArea">
              {posts.map((post, index) => (
                <ListItem key={index}>
                  <Grid container>
                    <Grid
                      item
                      xs={11.8}
                      align={
                        post.user?.username === username ? "right" : "left"
                      }
                    >
                      <ListItemIcon>
                        {post.ai_question ? (
                          <Avatar
                            sx={{ width: 40, height: 40 }}
                            alt="Sheldon AI"
                            src="https://res.cloudinary.com/dmkipvd8d/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1686121855/sheldon_640x480_41478610926_d6r4bh.jpg"
                          />
                        ) : post.user?.avatar ? (
                          <Avatar
                            sx={{ width: 40, height: 40 }}
                            alt={post.user.username}
                            src={post.user.avatar}
                          />
                        ) : (
                          <Avatar sx={{ width: 40, height: 40 }}>N</Avatar>
                        )}
                      </ListItemIcon>
                      {post.user ? (
                        <>
                          <ListItemText
                            sx={{ color: "#003D79" }}
                            primary={post.user.username}
                          />
                          <ListItemText primary={post.message} />
                        </>
                      ) : (
                        <>
                          <ListItemText
                            sx={{ color: "#003D79" }}
                            primary={getDefaultUser().username}
                          />
                          <ListItemText primary={post.message} />
                        </>
                      )}
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
            <div ref={messagesEndRef} />
            <Divider />

            <Grid container style={{ padding: "20px" }}>
              <Grid item xs={11}>
                <TextField
                  id="outlined-basic-email"
                  label="Type Something"
                  value={newPost}
                  onChange={handlePostChange}
                  placeholder="Ask your group or Sheldon a question!"
                  fullWidth
                />
              </Grid>
              <Grid item xs={1} align="right">
                <Fab
                  onClick={submitForm}
                  sx={{
                    bgcolor: '#003D79', 
                    '&:hover': {
                      bgcolor: '#00B2A9', 
                    },
                    color: 'white',
                  }}
                  color="primary"
                  aria-label="add"
                >
                  <SendIcon />
                </Fab>
              </Grid>
              <button
                className="feedButton"
                type="button"
                onClick={handleAskButtonClick}
              >
                Ask Sheldon AI
              </button>
              {loading && <p>Sheldon is thinking...</p>}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
