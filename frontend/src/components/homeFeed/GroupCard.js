import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';

const GroupCard = ({ group, onJoin }) => {

  const handleJoinClick = () => {
    onJoin(group._id);
  };

  return (
    <Card sx={{ maxWidth: 345, marginBottom: '1rem',borderRadius: '15px', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' }}>
      <CardMedia
        component="img"
        height="130"
        width={'100%'}
        image="https://res.cloudinary.com/dmkipvd8d/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1686121855/sheldon_640x480_41478610926_d6r4bh.jpg" // replace this with the image you want
        alt="Group"
      />
      <CardContent sx={{ marginBottom: '0rem' }}>
        <Typography gutterBottom variant="h6" component="div">
          {group.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {/* Insert other group information here */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" sx={{color: '#FFFFFF', backgroundColor: '#3f51b5', '&:hover': { backgroundColor: '#002984' } }} onClick={handleJoinClick}>
          Join
        </Button>
      </CardActions>
    </Card>
  );
}

export default GroupCard;
