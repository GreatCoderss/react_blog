import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { useStyles } from "./style";

export default function SinglePost({ title, imageFileSet, body }) {
  const classes = useStyles();
  return (
    <div>
      <Card>
        <CardMedia
          className={classes.media}
          image={imageFileSet}
          title={title}
        />
        <CardContent>
          <Typography variant='body1' component='h6' color='textPrimary'>
            {title}
          </Typography>
          <Typography variant='body1' component='h6' color='textPrimary'>
            {body}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
