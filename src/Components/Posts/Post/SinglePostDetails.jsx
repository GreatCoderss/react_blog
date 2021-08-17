import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { DeletePost, GetPostDetailsById } from "../../../HttpRequests/posts";
import { useStyles } from "./style";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DialogComponent from "../../common/DialogComponent";

export default function SinglePostDetails(props) {
  const classes = useStyles();
  const { id } = useParams();

  const [postData, setPostData] = useState({});
  const [fetched, setFetched] = useState(false);

  const [dialogState, setDialogState] = useState(false);
  const handleDialogOpen = () => {
    setDialogState(true);
  };
  const handleDialogClose = () => {
    setDialogState(false);
  };

  //form menu purpose
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //getting post Details
  useEffect(() => {
    !fetched &&
      GetPostDetailsById({ id })
        .then(({ data }) => {
          setPostData(data);
          setFetched(true);
        })
        .catch((e) => {
          console.log("error", e);
          if (e.response.status) {
            props.history.push("/posts");
          }
        });
  }, [id, fetched, props.history]);

  const dateFormater = (str) => {
    let date = new Date(str);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  };

  const DialogContent = () => (
    <Grid container>
      <Grid item xs={12}>
        <Paper component={Box} p={2}>
          <Typography
            variant='body1'
            color='primary'
            align='center'
            gutterBottom>
            Are You sure want to Delete ?
          </Typography>
          <Typography variant='h5' color='error' align='center' gutterBottom>
            {postData.title}
          </Typography>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            mt={3}
            mb={2}>
            <Button
              color='primary'
              variant='outlined'
              style={{ marginRight: "8px" }}
              onClick={() => handleDialogClose()}>
              Cancel
            </Button>
            <Button
              color='secondary'
              variant='outlined'
              onClick={() => {
                DeletePost({ id: postData.id }).then(({ data }) => {
                  console.log("Post Deleted Successfully", data);
                  handleDialogClose();
                  props.history.push("/posts");
                });
              }}>
              Delete
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth='lg'>
      <DialogComponent
        initialState={dialogState}
        handleClose={handleDialogClose}
        dialogData={<DialogContent />}
      />
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <Button
            component={Link}
            to={`/posts/edit/${postData.id}`}
            startIcon={<EditIcon />}
            color='primary'>
            {" "}
            Edit{" "}
          </Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button
            startIcon={<DeleteForeverIcon />}
            color='secondary'
            onClick={() => {
              handleDialogOpen();
            }}>
            {" "}
            Delete{" "}
          </Button>
        </MenuItem>
      </Menu>
      <Grid container>
        <Grid item xs={12} sm={8}>
          <Card>
            {!Object.keys(postData).length ? (
              <Box
                p={5}
                display='flex'
                justifyContent='center'
                alignItems='center'>
                <CircularProgress />
              </Box>
            ) : (
              <div>
                <List>
                  <ListItem>
                    <ListItemText>
                      <Typography variant='h6' color='textPrimary'>
                        {postData.title}
                      </Typography>
                      {postData.publishedAt ? (
                        <Typography variant='body2' color='textSecondary'>
                          published on {dateFormater(postData.publishedAt)}
                        </Typography>
                      ) : null}
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <IconButton
                        aria-controls='simple-menu'
                        aria-haspopup='true'
                        onClick={handleClick}>
                        <MoreVertIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
                <img
                  src={postData.imageFileSet}
                  alt={postData.title}
                  className={classes.media}
                />
                <CardContent>
                  <Typography variant='h6' color='textSecondary'>
                    {postData.description}
                  </Typography>
                </CardContent>
              </div>
            )}
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}></Grid>
      </Grid>
    </Container>
  );
}
