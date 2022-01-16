import React from "react";
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1em",
    marginBottom: "1em"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
}));

function generatePostURL(data) {
  return `${window.location.origin}/p/${encodeURIComponent(JSON.stringify(data))}`
}

function Post({ imageUrl, description, title, date }) {
  const [isLiked, setIsLiked] = useState(false)
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [showClipboardMsg, setShowClipboardMsg] = React.useState(false);

  const handleClick = () => {
    setShowClipboardMsg(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowClipboardMsg(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root} component="article">
      <CardMedia
        className={classes.media}
        image={imageUrl}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="inherit" component="h2" display="inline">
          {title}
        </Typography>
        <p>Posted on <time datetime={date}> {date}</time> </p>

      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          color={isLiked ? 'secondary' : 'default'}
          aria-label="like"
          onClick={() => { setIsLiked((prev) => !prev) }}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          aria-label="share"
          onClick={() => {
            const shareableURL = generatePostURL({ imageUrl, title, date })
            navigator.clipboard.writeText(shareableURL).then(function () {
              handleClick()
            }, function () {
              console.error("clipboard write failed")
            });
          }}
        >
          <ShareIcon />
        </IconButton>
        {description && <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {description}
          </Typography>
        </CardContent>
      </Collapse>
      <Snackbar
        open={showClipboardMsg}
        autoHideDuration={1500}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default Post
