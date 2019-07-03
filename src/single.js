import React from 'react';
import axios from 'axios';
export class Single extends React.Component{
    constructor(){
        super();
        this.state={
            imgarr:[],
            descriptionarr:[],
            categoryarr:[],
            timearr:[],
            idArr:[],
            emailArr:[],
            comment:"",
            cmntMail:[],
            cmnts:[],
            likes:[],
            dislikes:[],
            comments:[],
        }
    }
    getComments=()=>{
      console.log("get comments in before axios");
      var getId = {
        id:this.props.match.params.id,
      }
      // console.log("id in get cmnt"+getId.id);
      axios.post('http://localhost:4444/getComment',getId)
      .then(res=>{
        console.log("res in getCmnts"+JSON.stringify(res.data));
        for(let i = 0;i<res.data.length;i++){
          let a = this.state.cmntMail.slice();
          let b = this.state.cmnts.slice();
          a[i] = res.data[i].email;
          b[i] = res.data[i].comment;
          this.setState({
            cmntMail:a,
            cmnts:b,
          })
        }
      })
    }
    handleComment=(e)=>{
      this.setState({
        comment:e.target.value
      })
    }
    addComment=()=>{
      var tempCmnt = {
        email:localStorage.getItem("email"),
        postid: this.props.match.params.id,
        comment: this.state.comment,
      }
      axios.post('http://localhost:4444/addComment',tempCmnt)
      .then(res=>{
        this.latest();
        this.getComments();
      })
    }
    componentDidMount(){
        this.latest();
        this.getComments();
    }
    latest=()=>{
      console.log("props = "+JSON.stringify(this.props.match.params.id));
      var temp = {
        id:this.props.match.params.id
      }
      axios.post('http://localhost:4444/getSinglePost',temp)
      .then(res=>{
        console.log("here is res "+JSON.stringify(res.data[0]))
        for(let i=0;i<res.data.length;i++){
          let a = this.state.imgarr.slice();
          let b = this.state.descriptionarr.slice();
          let c = this.state.categoryarr.slice();
          let d = this.state.timearr.slice();
          let e = this.state.idArr.slice();
          let f = this.state.emailArr.slice();
          let g = this.state.likes.slice();
          let h = this.state.dislikes.slice();
          let j = this.state.comments.slice();
          j[i] = res.data[i].comments;
          h[i] = res.data[i].dislike;
          g[i] = res.data[i].like;
          f[i] = res.data[i].email;
          a[i] = res.data[i].filename;
          b[i] = res.data[i].description;
          c[i] = res.data[i].category;
          d[i] = res.data[i].createdAt;
        this.setState({
          imgarr: a,
          descriptionarr:b,
          categoryarr:c,
          timearr: d,
          idArr:e,
          emailArr:f,
          likes:g,
          dislikes:h,
          comments:j,
        })
        }
        let a = this.state.imgarr.slice();
        let b = this.state.descriptionarr.slice();
        let c = this.state.categoryarr.slice();
        let d = this.state.timearr.slice();
        let e = this.state.idArr.slice();
        let f = this.state.emailArr.slice();
        let g = this.state.likes.slice();
        let h = this.state.dislikes.slice();
        let j = this.state.comments.slice();
        this.setState({
          imgarr:a.reverse(),
          descriptionarr:b.reverse(),
          categoryarr:c.reverse(),
          timearr: d.reverse(),
          idArr:e.reverse(),
          emailArr:f.reverse(),
          likes:g.reverse(),
          dislikes:h.reverse(),
          comments:j.reverse(),
        //               // img:"http://localhost:4444/"+res.data[0].filename
        })
        console.log("imgarr "+this.state.imgarr);
      }) 
    }
    render(){
      return (
        <div>
          <meta charSet="utf-8" />
          <title>Singal Post</title>
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
                <div className="rght_btn"> <span className="rght_btn_icon"><img src={require("./images/btn_iconb.png")} alt="up" /></span> <span className="btn_sep"><img src={require("./images/btn_sep.png")} alt="sep" /></span> <a href="#">Upload Post</a> </div>
                <div className="rght_btn"> <span className="rght_btn_icon"><img src={require("./images/btn_icona.png")} alt="up" /></span> <span className="btn_sep"><img src={require("./images/btn_sep.png")} alt="sep" /></span> <a href="#">Invite Friends</a> </div>
                <div className="rght_cate">
                  <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                  <div className="rght_list">
                    <ul>
                      <li><a href="#"><span className="list_icon"><img src={require("./images/icon_01.png")} alt="up" /></span> CATS</a></li>
                      <li><a href="#"><span className="list_icon"><img src={require("./images/icon_02.png")} alt="up" /></span> Dogs</a></li>
                      <li><a href="#"><span className="list_icon"><img src={require("./images/icon_03.png")} alt="up" /></span> Birds</a></li>
                      <li><a href="#"><span className="list_icon"><img src={require("./images/icon_04.png")} alt="up" /></span> Rabbit</a></li>
                      <li><a href="#"><span className="list_icon"><img src={require("./images/icon_05.png")} alt="up" /></span> Others</a></li>
                    </ul>
                  </div>
                </div>
                <div className="rght_cate">
                  <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
                  <div className="sub_dwn">
                    <div className="feat_sec">
                      <div className="feat_sec_img"><img src={require("./images/feat_img1.png")} alt="image" /></div>
                      <div className="feat_txt">Lorem Ipusum Text</div>
                    </div>
                    <div className="feat_sec">
                      <div className="feat_sec_img"><img src={require("./images/feat_img2.png")} alt="image" /></div>
                      <div className="feat_txt">Lorem Ipusum Text</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">Dogs</div>
                      </div>
                    </div>
                    <div className="feat_sec">
                      <div className="feat_sec_img"><img src={require("./images/feat_img3.png")} alt="image" /></div>
                      <div className="feat_txt">Lorem Ipusum Text</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">Rabbits</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content_lft">
              {this.state.imgarr.map((k,s)=>
// <img src={'http://localhost:8000/'+ this.state.imgarr[s]}/>
<a href={'/single/'+this.state.idArr[s]}>
<div className="contnt_2">
<div className="div_a">
  <div className="div_title">{this.state.descriptionarr[s]}</div>
  <div className="btm_rgt">
    <div className="btm_arc">{this.state.categoryarr[s]}</div>
    {/* {console.log(this.state.category)} */}
  </div>
  <div className="div_top">
   <div className="div_top_lft"><img src={require("./images/img_6.png")} alt="pic" />{this.state.emailArr[s]}</div>
    <div className="div_top_rgt"><span className="span_date">{this.state.timearr[s].substring(0,10)}</span>
    <span className="span_time">{this.state.timearr[s].substring(11,19)}</span></div>
  </div>
  <div className="div_image"><img src={'http://localhost:4444/'+ this.state.imgarr[s]}/></div>
  <div className="div_btm">
    <div className="btm_list">
      <ul>
        <li><a href="#"><span className="btn_icon"><img src={require('./images/icon_001.png')} alt="share" /></span>Share</a></li>
        <li><a href="#"><span className="btn_icon"><img src={require('./images/icon_002.png')} alt="share" /></span>Flag</a></li>
        <li><span className="btn_icon"><img src={require('./images/icon_004.png')} alt="share" /></span>Comments</li>
        <div className="like_count"><span className="lft_cnt" /><span className="mid_cnt">{this.state.comments[s]}</span><span className="rit_cnt" /></div>
        <li><a href="#"><span className="btn_icon"><img src={require('./images/icon_003.png')} alt="share" /></span>Likes</a></li>
        <div className="like_count" style={{marginRight: '10px'}}><span className="lft_cnt" /><span className="mid_cnt">{this.state.likes[s]}</span><span className="rit_cnt" /></div>
        <li><a href="#"><span className="btn_icon"><img src={require('./images/icon_003.png')} alt="share" /></span>Unlike</a></li>
        <div className="like_count"><span className="lft_cnt" /><span className="mid_cnt">{this.state.dislikes[s]}</span><span className="rit_cnt" /></div>
      </ul>
    </div>
  </div>
</div>
</div>
</a>
     )}
                <div className="contnt_3">
                  <ul>
                    {this.state.cmnts.map((k,s)=>
                    <li>
                      <div className="list_image">
                        <div className="image_sec"><img src={require("./images/post_img.png")} /></div>
                        <div className="image_name">{this.state.cmntMail[s]}</div>
                      </div>
                      <div className="list_info">
                      {this.state.cmnts[s]}
                      </div>
                    </li>
                    )
                    }
                    <li>
                      <div className="cmnt_div1">
                        <input type="text" onChange={this.handleComment} placeholder="Enter your Comment" className="cmnt_bx1" />
                        <button type="submit" onClick={this.addComment} className="sub_bttn1" defaultValue="Submit">Submit</button>
                      </div>
                    </li>
                  </ul>
                  <div className="view_div"><a href="#">View more</a></div>
                </div>
              </div>
            </div>
            <div className="clear" />
          </div>
        </div>
      );
    }
}
