import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import Home from './Components/Home/Home';
import Inventory from './Components/Inventory/Inventory';
import Groups from './Components/Groups/Groups';
import NotFound from './Components/NotFound/NotFound';


class App extends Component {
  render() {
    return (
      <div>
        <nav>
        <Link to="/">Home</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/groups">Groups</Link>

        </nav>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/inventory" component={Inventory}/>
          <Route path="/groups" component={Groups}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
      
    );
  }
}

export default App;
