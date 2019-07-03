import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import logo from './mask.png';
import './App.css';
// import Head from './new';
import Form from './signup';
import {Head} from './header';
import {Nav} from './nav';
import Login from './login.js';
import {Footer} from './footer'
import { createRequireFromPath } from 'module';
import {Single} from './single';
class ProtectedRoutes extends React.Component{
  constructor(){
    super();
    this.state={
      flag: localStorage.getItem("email")
    }
    console.log("flag=" + this.state.flag);
  }
  render() {
    const { component: Component, ...props } = this.props

    return (
      <Route 
        {...props} 
        render={props => (
          this.state.flag ?
            <Component {...props} /> :
            <Redirect to='/login' />
        )} 
      />
    )
  }
}

class App extends React.Component {
  render(){
    return (
      <div className="App"> 
          {/* <img src={require("./mask.png")} className="App-logo" alt="logo" /> */}
          <Head />
          <Switch>
            <Route path='/signup' component={Form}/>
            <Route path="/login" component={Login} />
            <ProtectedRoutes exact path='/' component={Nav}/>
            <Route path='/single/:id' component={Single}/>
          </Switch>
          <Footer />
      </div>
    ) 
  }
}
export default App;
