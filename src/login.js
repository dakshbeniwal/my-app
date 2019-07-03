import React from 'react';
import axios from 'axios';
import  { Redirect } from 'react-router-dom'

const query = require('querystring')
class Login extends React.Component{
    constructor(){
        super();
        this.state={
            username:"",
            loginmail:"",
            loginpass:"",
            loginerr:"",
        }
    }
    change=(e)=>{
        console.log("Change runnning");
        this.setState({
            [e.target.name]:e.target.value
        })            
        // {console.log([e.target.name]+'='+e.target.value)}
    }
    login=(e)=> {
        console.log("Reached Login");
        console.log("login state"+this.state.loginmail)
        localStorage.setItem("email",this.state.loginmail);
        axios.post('http://localhost:4444/login',query.stringify({email:this.state.loginmail,password:this.state.loginpass}))
        .then((res)=>{
                   this.setState({loginerr:res.data})
                   console.log('loginerr'+this.state.loginerr);
                   this.checkLogin();
                   }
                   
        )
        e.preventDefault(); 
    }
    checkLogin=()=>{
      if(this.state.loginerr=="Login Successful!"){
        console.log("Yha phuch gya");
        console.log(this.props.history);
        this.props.history.push("/");      }
    }
    render(){
        return(
                    <div>
                      <meta charSet="utf-8" />
                      <title>Login Account</title>
                      <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
                      <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
                      <div className="navbar navbar-inverse navbar-fixed-top">
                        <div className="navbar-inner">
                          <div className="container">
                            <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
                            <a className="brand" href>PPL</a>
                            <div className="pro_info pull-right">
                              <div className="pro_icn"><img src={require("./images/pic_small.png")} /></div>
                              <div className="pro_txt">Me<b className="caret" /></div>
                              <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
                                <li><a tabIndex={-1} href="#">My Profile</a></li>
                                <li><a tabIndex={-1} href="#">Message Box</a></li>
                                <li><a tabIndex={-1} href="#">Change Language</a></li>
                                <li className="divider" />
                                <li><a tabIndex={-1} href="#">
                                    <input type="text" placeholder="search" />
                                  </a></li>
                              </ul>
                            </div>
                            <div className="nav-collapse collapse">
                              <ul className="nav">
                                <li className="active"> <a href>Home</a> </li>
                                <li className> <a href>E-Coupons</a> </li>
                                <li className> <a href>E-Brands</a> </li>
                                <li className> <a href>Resuse Market</a> </li>
                                <li className> <a href>Lost and Found</a> </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="container">
                        <div className="content">
                          <div className="content_rgt">
                            <div className="login_sec">
                              <h1>Log In</h1>
                              <form onSubmit={this.login}>
                              <ul>
                                <li><span>Email-ID</span><input onChange={this.change} type="email" placeholder="Enter your email" name="loginmail" required/></li>
                                <li><span>Password</span><input onChange={this.change} type="password" placeholder="Enter your password" name="loginpass" required/></li>
                                <li><input type="checkbox" />Remember Me</li>
                                <li><button type="submit" defaultValue="Log In">Login</button><a href>Forgot Password</a></li>
                              </ul>
                              <h2>{this.state.loginerr}</h2>
                              </form>
                              <div className="addtnal_acnt">I do not have any account yet.<a href='/signup'>Create My Account Now !</a></div>
                            </div>
                          </div>
                          <div className="content_lft">
                            <h1>Welcome from PPL!</h1>
                            <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
                            <img src={require("./images/img_9.png")} alt /> </div>
                        </div>
                      </div>  
                      <div className="clear" />
                    </div>
        )
    }
}
export default Login;