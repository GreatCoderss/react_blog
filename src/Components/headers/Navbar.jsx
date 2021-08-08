import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import imageUrl from "../../images/logo192.png";

export default function Navbar() {
  return (
    <AppBar>
      <Toolbar>
        <img
          src={imageUrl}
          alt='React Blog'
          style={{ width: "40px", height: "auto", padding: "5px 10px" }}
        />
        <Typography variant='body1' component='h6'>
          React Blog
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
