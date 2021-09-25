import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Box, Hidden, IconButton, InputBase } from "@material-ui/core";
import { NavbarStyle } from "./navbarStyle";
import image from "../../images/logo192.png";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { PostAdd } from "@material-ui/icons";

export default function Navbar() {
  const classes = NavbarStyle();

  const handleOnChangeInput = (e) => {
    console.log("value ", e.target.value);
  };

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Link to='/' className={classes.link}>
          <Box className={classes.logoContainer}>
            <img src={image} alt='react blog' className={classes.logo} />
            <Hidden xsDown>
              <Typography variant='h6' className={classes.title} noWrap>
                React Blog
              </Typography>
            </Hidden>
          </Box>
        </Link>
        <div className={classes.flexGrow} />
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder='Search ...'
            inputProps={{ "aria-details": "Search" }}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={handleOnChangeInput}
          />
        </div>
        <Hidden xsDown>
          <Button
            component={Link}
            to='/posts/add'
            variant='contained'
            color='secondary'
            startIcon={<PostAddIcon />}
            className={classes.button}>
            Add Post
          </Button>
        </Hidden>
        <Hidden smUp>
          <IconButton component={Link} to='/posts/add' color='inherit'>
            <PostAddIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
