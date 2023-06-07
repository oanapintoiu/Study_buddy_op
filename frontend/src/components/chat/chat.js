import React, { useState, useRef, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send' 


const Chat = ({posts, username, handlePostChange, handleSubmit, newPost, handleAskAI, loading}) => {

  const [postText, setPostText] = useState('');
  const messagesEndRef = useRef(null)

  const submitForm = (event) => {
    handleSubmit(event);
    setPostText('')
  };

  const handleAskButtonClick = () => {
    handleAskAI(newPost);
    setPostText('');
  };

  useEffect(() => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [posts]);

  return (
      <div>
        <Grid container>
           
        </Grid>
        <Grid container component={Paper} className='chatSection'>
            <Grid item xs={20}>
                <List className="messageArea">

                  {posts.map((post, index) => (
                       
                      <ListItem key={index}>
                      <Grid container>
                          <Grid> item xs={12} align={post.user.username === username ? "left" : "right"}>
                              <ListItemIcon>
                                  <Avatar sx={{ width: 24, height: 24 }}alt={post.user.username} src={post.user.avatar} />
                              </ListItemIcon>
                              <ListItemText sx={{color: 'cornflowerblue'}} primary={post.user.username}>{post.user.username}</ListItemText>
                              <ListItemText  primary={post.message}></ListItemText>
                          </Grid>
                      </Grid>
                  </ListItem>
                  ))}
               
                
                </List>
                <div ref={messagesEndRef} />
                <Divider />

                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something"
                        value={newPost}
                        onChange={handlePostChange}

                        placeholder="Ask your group or Sheldon a question!"
                        fullWidth />
                    </Grid>
                    <Grid item xs={1} align="right">
                        <Fab onClick={submitForm} color="primary" aria-label="add"><SendIcon /></Fab>
                        
                    </Grid>
                    <button className="feedButton" type="button" onClick={handleAskButtonClick}>Ask Sheldon AI</button>
      {loading && <p>Sheldon is thinking...</p>}
                </Grid>
            </Grid>
        </Grid>
      </div>
  );
}

export default Chat;