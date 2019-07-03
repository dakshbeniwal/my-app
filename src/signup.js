import React from 'react';
import axios from 'axios';


const query = require('querystring')
class form extends React.Component{
    constructor(){
        super();
        this.state={
            username:"",
            firstname:"",
            lastname:"",
            email:"",
            password:"",
            err:"",
        }
    }
    change=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })            
        // {console.log([e.target.name]+'='+e.target.value)}
    }
    signup=(e)=>{
        e.preventDefault();
        console.log("Reached signup axios");
        axios.post('http://localhost:4444/post',query.stringify({email:this.state.email,password:this.state.password,firstname:this.state.firstname,lastname:this.state.lastname,password:this.state.password,username:this.state.username}))
        .then(res=>{
          if(typeof res.data == String){
            this.setState({err:res.data});
          }
          else{
            localStorage.setItem("email",this.state.email);
            this.props.history.push('/');
          }
        })
    }
    render(){
        return(
            <div>
      <div>
        <meta charSet="utf-8" />
        <title>Create An Account</title>
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
              <div className="register_sec">
                <h1>Create An Account</h1>
                <form onSubmit={this.signup}>
                <ul>
                  <li><span>Username</span><input onChange={this.change} type="text" placeholder="Enter your username" name="username" required/></li>
                  <li><span>Password</span><input onChange={this.change} type="password" placeholder="Enter your password" name="password" required/></li>
                  <li><span>Email</span><input onChange={this.change} type="email" placeholder="Enter your email" name="email" required/></li>
                  <li><span>First Name</span><input onChange={this.change} type="text" placeholder="Enter your first name" name="firstname" required/></li>
                  <li><span>Last Name</span><input onChange={this.change} type="text" placeholder="Enter your last name" name="lastname" required/></li>
                  <li><input type="checkbox" required/>I agree to Term &amp; Conditions</li>
                  <li><button type="submit" defaultValue="Register">Submit</button></li>
                {/* <h2>{this.state.greet}</h2> */}
                <h2>{this.state.err}</h2>
                </ul>
                </form>
                <div className="addtnal_acnt" ><p style={{float:"left",fontSize:20}}>I already have an account.</p><a style={{float:"left" ,fontSize:20}} href="/login">Login My Account !</a></div>
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
            </div>
        )
    }
}
export default form;