import Feed from './components/Feed'
import Container from '@material-ui/core/Container';
import React from 'react';
import Header from './components/Header'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SharedPostContainer from './components/SharedPostContainer'

export default function App() {

  return (
    <Router>
      <Header />
      <Container maxWidth="md" component="main">
        <Switch>
          <Route exact path="/">
            <Feed />
          </Route>
          <Route path="/p/:data">
            <SharedPostContainer />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}
