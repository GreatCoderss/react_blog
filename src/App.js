import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Header/Navbar";
import Posts from "./Components/Posts/Posts";
import AddPost from "./Components/Posts/Post/AddPost";
import EditPost from "./Components/Posts/Post/EditPost";
import SinglePostDetails from "./Components/Posts/Post/SinglePostDetails";
import PageNotFound from "./Components/PageNotFound";
import { AppStyles } from "./AppbarStyle";
import { SearchPostData } from "./HttpServices/Posts";

export default function App() {
  const classes = AppStyles();
  const [searchPostData, setSearchPostData] = useState([]);

  const handleSearchOnChange = (target) => {
    SearchPostData({ data: target.value }).then(({ data: { posts } }) => {
      setSearchPostData(posts);
      console.log("data", posts);
    });
    console.log("value", target.value);
  };

  return (
    <div>
      <Navbar
        searchPostData={searchPostData}
        handleSearchOnChange={handleSearchOnChange}
      />
      <div className={classes.main}>
        <Switch>
          <Route
            exact
            path='/'
            render={(props) => (
              <Posts searchPostData={searchPostData} {...props} />
            )}
          />
          <Route exact path='/posts' render={(props) => <Redirect to='/' />} />
          <Route path='/posts/add' render={(props) => <AddPost {...props} />} />
          <Route
            path='/posts/edit/:id'
            render={(props) => <EditPost {...props} />}
          />
          <Route
            path='/posts/:id'
            render={(props) => <SinglePostDetails {...props} />}
          />
          <Route path='/*' render={(props) => <PageNotFound {...props} />} />
        </Switch>
      </div>
    </div>
  );
}
