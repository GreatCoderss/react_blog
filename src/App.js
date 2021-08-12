import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./Components/headers/Navbar";
import PageNotFound from "./Components/PageNotFound";

import AddPost from "./Components/Posts/Post/AddPost";
import EditPost from "./Components/Posts/Post/EditPost";
import SinglePostDetails from "./Components/Posts/Post/SinglePostDetails";
import Posts from "./Components/Posts/Posts";

export default function App() {
  return (
    <Fragment>
      <Navbar />
      <div style={{ marginTop: "65px", padding: "10px" }}>
        <Switch>
          <Route exact path='/' render={(props) => <Posts />} />
          <Route exact path='/posts' render={(props) => <Redirect to='/' />} />
          <Route path='/posts/add' render={(props) => <AddPost />} />
          <Route path='/posts/edit/:id' render={(props) => <EditPost />} />
          <Route path='/posts/:id' render={(props) => <SinglePostDetails />} />
          <Route path='/*' component={PageNotFound} />
        </Switch>
      </div>
    </Fragment>
  );
}
