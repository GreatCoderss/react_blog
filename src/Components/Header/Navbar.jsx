import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
  Box,
  Hidden,
  IconButton,
  InputBase,
  CircularProgress,
} from "@material-ui/core";
import { NavbarStyle } from "./navbarStyle";
import image from "../../images/logo192.png";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";

export default function Navbar({ searchPostData, handleSearchOnChange }) {
  const classes = NavbarStyle();
  const [isOnChange, setIsOnChange] = useState(false);
  const [targetValue, setTargetValue] = useState("");

  useEffect(() => {
    setIsOnChange(false);
  }, [searchPostData]);

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
        <div className={classes.grow} />
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            {!isOnChange ? (
              <SearchIcon />
            ) : (
              <CircularProgress
                style={{
                  width: "20px",
                  height: "20px",
                  color: "white",
                }}
              />
            )}
          </div>
          <InputBase
            placeholder='search ...'
            inputProps={{ "aria-details": "search" }}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={({ target }) => {
              handleSearchOnChange(target);
              setIsOnChange(true);
              setTargetValue(target.value);
            }}
          />
          {targetValue.length > 0 ? (
            <Box className={classes.infoMsg}>
              {searchPostData.length === 0 ? (
                <Typography variant='body2' align='center' color='error'>
                  No Record Found !!
                </Typography>
              ) : (
                <Typography variant='body2' align='center' color='inherit'>
                  Found {searchPostData.length} Found ...
                </Typography>
              )}
            </Box>
          ) : null}
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
