import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'


const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Landing} />
          <section className='container'>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </section>
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;