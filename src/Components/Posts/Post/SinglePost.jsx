import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { useStyles } from "./style";
import { Link } from "react-router-dom";

export default function SinglePost({ item }) {
  const classes = useStyles();
  console.log("item", item);
  return (
    <div>
      <Card>
        <img
          src={item.imageFileSet}
          alt={item.title}
          className={classes.media}
        />
        <CardContent>
          <Link to={`/posts/${item.id}`} style={{ textDecoration: "none" }}>
            <Typography
              variant='body1'
              component='h5'
              color='textPrimary'
              style={{ textTransform: "capitalize" }}>
              {item.title}
            </Typography>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
