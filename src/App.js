import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import PageNotFound from "./Components/PageNotFound";

import AddPost from "./Components/Posts/Post/AddPost";
import EditPost from "./Components/Posts/Post/EditPost";
import SinglePostDetails from "./Components/Posts/Post/SinglePostDetails";
import Posts from "./Components/Posts/Posts";

export default function App() {
  return (
    <Switch>
      <Route exact path='/' render={() => <Posts />} />
      <Route exact path='/posts' render={() => <Redirect to='/' />} />
      <Route path='/posts/add' render={() => <AddPost />} />
      <Route path='/posts/edit/:id' render={() => <EditPost />} />
      <Route path='/posts/:id' render={() => <SinglePostDetails />} />
      <Route path='/*' component={PageNotFound} />
    </Switch>
  );
}
