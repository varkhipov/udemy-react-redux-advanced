import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Welcome from './Welcome';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import SignOut from './auth/SignOut';
import Feature from './Feature';

/*
* The <Switch> is not required for grouping <Route>s, but it can be quite useful.
* A <Switch> will iterate over all of its children <Route> elements
* and only render the first one that matches the current location.
* This helps when multiple route’s paths match the same pathname,
* when animating transitions between routes, and in identifying when no routes
* match the current location (so that you can render a “404” component).
* */
const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path="/" component={Welcome}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/signin" component={SignIn}/>
          <Route exact path="/signout" component={SignOut}/>
          <Route exact path="/feature" component={Feature}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
