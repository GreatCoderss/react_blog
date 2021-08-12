import {
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetPostDetailsById } from "../../../HttpRequests/posts";
import { useStyles } from "./style";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export default function SinglePostDetails() {
  const classes = useStyles();
  const { id } = useParams();

  const [postData, setPostData] = useState({});
  const [fetched, setFetched] = useState(false);

  //getting post Details
  useEffect(() => {
    !fetched &&
      GetPostDetailsById({ id }).then(({ data }) => {
        console.log("postDetails", data);
        setPostData(data);
        setFetched(true);
      });
  }, [id, fetched]);

  return (
    <Container maxWidth='lg'>
      <Grid container>
        <Grid item xs={12} sm={8}>
          <Card>
            <List>
              <ListItem>
                <ListItemText>
                  <Typography variant='h6' color='textPrimary'>
                    {postData.title}
                  </Typography>
                </ListItemText>
                <ListItemSecondaryAction>
                  <Link to={`/posts/edit/${id}`}>
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  </Link>
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
                {postData.body}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}></Grid>
      </Grid>
    </Container>
  );
}
