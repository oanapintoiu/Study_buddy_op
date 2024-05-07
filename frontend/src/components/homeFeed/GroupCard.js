import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import { FaRegComment } from "react-icons/fa";
import "./GroupCard.css";

const GroupCard = ({ group, onJoin }) => {
  const handleJoinClick = () => {
    onJoin(group._id);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        marginBottom: "1rem",
        borderRadius: "15px",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CardMedia
        component="img"
        height="90"
        width={"100%"}
        image={
          group.groupCard == null
            ? "https://res.cloudinary.com/dmkipvd8d/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1686121855/sheldon_640x480_41478610926_d6r4bh.jpg"
            : group.groupCard
        }
        alt="Group"
      />
      <CardContent sx={{ marginBottom: "0rem" }}>
        <Typography gutterBottom variant="h6" component="div">
          {group.name}
        </Typography>
        <Typography variant="body2" color="text.secondary"></Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button
          size="small"
          sx={{
            color: "#FFFFFF",
            backgroundColor: "#3f51b5",
            "&:hover": { backgroundColor: "#002984" },
          }}
          onClick={handleJoinClick}
        >
          Join
        </Button>
        <FaRegComment size={20} />
      </CardActions>
    </Card>
  );
};

export default GroupCard;
