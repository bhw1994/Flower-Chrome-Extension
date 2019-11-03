import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import "../css/memoList.scss";

import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import { makeStyles } from "@material-ui/core/styles";

import ReactMarkdown from "react-markdown";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FlowerAPI from "../apis/FlowerAPI";

const useStyles = makeStyles({
  card: {
    height: "150px",
    overflow: "hidden"
  }
});

export default function MemoModal(item) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [displayState, setDisplayState] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const memoDelete = memoId => {
    setDisplayState(true);
    FlowerAPI.deleteMemos(memoId);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    const { current: descriptionElement } = descriptionElementRef;
    if (descriptionElement !== null) {
      descriptionElement.focus();
    }
  }, [open]);

  return (
    <Grid
      className="memo-grid"
      item
      md={2}
      sm={4}
      style={{ display: displayState ? "none" : "inline" }}
    >
      <Card>
        <CardActionArea onClick={handleClickOpen}>
          <Skeleton
            variant="rect"
            width="100%"
            height={118}
            margin-bottom={10}
          />
          <CardContent className={classes.card}>
            <Typography
              variant="body2"
              color="textSecondary"
              clsssName="memo-display-content"
            >
              <ReactMarkdown source={item.item.content}></ReactMarkdown>
            </Typography>
          </CardContent>
        </CardActionArea>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Memo</DialogTitle>
          <DialogContent dividers>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <ReactMarkdown source={item.item.content}></ReactMarkdown>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              <a href={item.item.url}>Go to Website</a>
            </Button>
          </DialogActions>
        </Dialog>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => memoDelete(item.item.memoId)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
