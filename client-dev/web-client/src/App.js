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
import Login from './Components/Login/Login'
import Logout from './Components/Logout/Logout';
import Register from './Components/Register/Register';

class App extends Component {
  render() {
    return (
      <div>
        <nav>
        <Link to="/">Home</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/groups">Groups</Link>
        <Link to="/login">Login</Link>
        <Link to="/logout">Logout</Link>
        <Link to="/register">Register</Link>

        </nav>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/inventory" component={Inventory}/>
          <Route path="/groups" component={Groups}/>
          <Route path="/login" component={Login}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/register" component={Register}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
      
    );
  }
}

export default App;
