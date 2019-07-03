import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Query } from 'mongoose';
var mail = localStorage.getItem("email");
export class Container extends React.Component{
  constructor() {
    super();
    this.state = {
      flag: Boolean,
      src: null,
      img: '',
      files: [],
      imgarr:[],
      descriptionarr: [],
      categoryarr:[],
      timearr:[],
      category:"cat",
      description:"",
      flagCat:false,
      catIcon:null,
      catName:'',
      catArr:[],
      catNameArr:[],
      addCatErr:"",
      idArr:[],
      emailArr:[],
      likes:[],
      dislikes:[],
      comments:[],
    }
  }
  toggleUpload=()=>{
    
    // console.log("Before toogle"+this.state.flag)
    if(this.state.flag==true)
    this.setState({
      flag:false
    }) 
    else{
      this.setState({
        flag:true
      })
    }
    // console.log(this.state.flag)
  } 
  addDes=(e)=>{
    this.setState({
      description:e.target.value
    })
    // console.log("DES="+this.state.description);
  }
  componentDidMount(){
    this.latest();
    axios.post('http://localhost:4444/getCat',{})
    .then(res=>{
      // console.log("phuch gya") 
      for(let i=0;i<res.data.length;i++){
        console.log("here is cat res "+JSON.stringify(res.data[0]))
        let a = this.state.catArr.slice();
        let b = this.state.catNameArr.slice();
        a[i] = res.data[i].catIcon;
        b[i] = res.data[i].catName;
        this.setState({
          catArr:a,
          catNameArr:b
        })
      }
    })
  }
  upload=(e)=>{
    this.toggleUpload();
    e.preventDefault();
    var formdata = new FormData();
    // console.log("state in formdata"+JSON.stringify(this.state.src.path))
    formdata.append('file',this.state.src);
    formdata.append('description',this.state.description);
    formdata.append('category',this.state.category);
    formdata.append('mail',localStorage.getItem("email"));
    console.log("mail is "+ mail);
    console.log("upload function"+formdata);
    axios.post('http://localhost:4444/upload',formdata)
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
        e[i] = res.data[i]._id;
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
    .catch(err=>{
      console.log(err);
    }
    )
  }
  onDrop=(acceptedFiles,rejectedFiles)=>{
      // console.log("ondrop");
    // console.log("file"+JSON.stringify(acceptedFiles[0]))
    this.setState({
      files:acceptedFiles,
      src:acceptedFiles[0],
    })
    // console.log("file state"+JSON.stringify(this.state.files.length));
  }
  changeCategory=(e)=>{
    this.setState({
      category:e.target.value
    })
    // console.log("category="+this.state.category)
  }
  toggleCat=()=>{
    if(this.state.flagCat==false){
      this.setState({
        flagCat:true
      })
    }
    else{
      this.setState({
        flagCat:false
      })
    }
  }
  addCat=(e)=>{
    console.log("addcat is running"); 
    let formdata= new FormData();
    formdata.append('file',this.state.catIcon);
    console.log("caticon state=",this.state.catIcon)
    formdata.append('cat',this.state.catName);
    console.log("catname state=",this.state.catName)
    console.log("e = "+formdata) ;
    e.preventDefault();
    axios.post('http://localhost:4444/addCat',formdata)
    .then(res=>{
      console.log("res before if else"+typeof(res.data));
      if(typeof(res.data) === "string"){
        this.setState({
          addCatErr:res.data
        })
      }
      else{
      // console.log("phuch gya") 
      for(let i=0;i<res.data.length;i++){
        console.log("here is cat res "+JSON.stringify(res.data[0]))
        let a = this.state.catArr.slice();
        let b = this.state.catNameArr.slice();
        a[i] = res.data[i].catIcon;
        b[i] = res.data[i].catName;
        this.setState({
          catArr:a,
          catNameArr:b
        })
      }
    }
    })
  }
  iconDrop=(acceptedFiles)=>{
    this.setState({
      catIcon:acceptedFiles[0]
    })
  }
  setCat=(e)=>{
    var name=e.target.value.toUpperCase();
    this.setState({
      catName:name
    })
  }
  oldest=()=>{
    axios.post('http://localhost:4444/getPosts',{})
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
        e[i] = res.data[i]._id;
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
    })
  }
    latest=()=>{
      console.log("Latest chl pda!");

      axios.post('http://localhost:4444/getPosts',{})
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
          e[i] = res.data[i]._id;
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
        // console.log("imgarr "+this.state.imgarr);
      }) 
    }
    like=(s)=>{
      console.log("s is "+this.state.idArr[s]);
      var tempMail = localStorage.getItem("email");
      var likeid = {
        id : this.state.idArr[s],
        mail: tempMail,
      }
      axios.post('http://localhost:4444/like',likeid)
      .then(()=>{
        console.log("Then after axios like");
        this.latest();
      })
    }
    dislike=(s)=>{
      console.log("s in dislike"+this.state.idArr[s]);
      var tempMail = localStorage.getItem("email");
      var dislikeid = {
        id : this.state.idArr[s],
        mail: tempMail,
      }
      axios.post('http://localhost:4444/dislike',dislikeid)
      .then(()=>{
        this.latest();
      })
    }
    render(){
        return(
            <div className="container">
            <div className="content">
              <div className="content_rgt">
                <div className="rght_btn" > <span className="rght_btn_icon"><img src={require("./images/btn_iconb.png")} alt="up" /></span> <span className="btn_sep"><img src={require("./images/btn_sep.png")} alt="sep" /></span> <a onClick={this.toggleUpload} href="#">Upload Post</a> 
                {this.state.flag==true && <div>
              <div>
            <Dropzone
            onDrop={this.onDrop}
            accept="image/png,image/jpeg,image/jpg"
            minSize={0}
            maxSize={5242880}
            multiple
          >
            {({getRootProps, getInputProps, isDragActive, isDragReject,acceptedFiles, rejectedFiles}) => {
              const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > 5242880;
              return (
                <div>
                <div className="dropzone"{...getRootProps()}>
                  <input {...getInputProps()} />
                  
                </div>
                <div>
                {!isDragActive && 'Click here or drop a file to upload!'}<br/>  
                  {isDragActive && !isDragReject && "Drop it like it's hot!"}<br/> 
                  {isDragReject && "File type not accepted, sorry!"}<br/> 
                  {isFileTooLarge && (
                    <div>
                      File is too large.
                    </div>
                    
                  )}
                  <select onChange={this.changeCategory}>
                    <option name="cat">CAT</option>
                    <option name="dog">DOG</option>
                    <option name="rabbit">RABBIT</option>
                    <option>BIRDS</option>
                    {
                      this.state.catNameArr.map((j,i)=>
                        <option>{this.state.catNameArr[i]}</option>
                      )
                    }
                  </select>
                  
    <div>
      Enter Description ;- <br/><br/>
      <input type="text" name="des" style={{height:'200px'}} onChange={this.addDes}></input>
    <img src={this.state.img}/>  
    </div>
    {/* {console.log("image state later :- "+this.state.img)} */}
    <h2>{this.state.result}</h2>
    <button onClick={this.upload}>Submit</button>
                </div>
                </div>
                )}
              
            }
          </Dropzone>
          </div>    </div>
        }
        
                </div>
                <div className="rght_btn"> <span className="rght_btn_icon"><img src={require("./images/btn_icona.png")} alt="up" /></span> <span className="btn_sep"><img src={require("./images/btn_sep.png")} alt="sep" /></span> <a href="#" onClick={this.toggleCat}>Add a category</a>
                {this.state.flagCat==true && <div>
              <div>
              Enter new Category :- <br/> <br/>
                      <input type="text" name="newCat" onChange={this.setCat}></input><br/><br/>
              Add icon for new category:-
            <Dropzone
            onDrop={this.iconDrop}
            accept="image/png,image/jpeg,image/jpg"
            minSize={0}
            maxSize={1048576}
            multiple
          >
            {({getRootProps, getInputProps, isDragActive, isDragReject,acceptedFiles, rejectedFiles}) => {
              const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > 1048576;
              return (
                <div>
                <div className="catIcon"{...getRootProps()}>
                  <input {...getInputProps()} />
                  
                </div>
                <div>
                {!isDragActive && 'Click here or drop a file to upload!'}<br/>  
                  {isDragActive && !isDragReject && "Drop it like it's hot!"}<br/> 
                  {isDragReject && "File type not accepted, sorry!"}<br/> 
                  {isFileTooLarge && (
                    <div>
                      File is too large.
                    </div>
                    
                  )}
                      <button onClick={this.addCat}>Submit</button>
                      <h2>{this.state.addCatErr}</h2>
                  
    <div>
    </div>
    {/* {console.log("image state later :- "+this.state.img)} */}
    {/* <button onClick={this.addCat}>Submit</button> */}
                </div>
                </div>
                )}
              
            }
          </Dropzone>
          </div>    </div>
        }
                 </div>
                <div className="rght_cate">
                  <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                  <div className="rght_list">
                    <ul>
                      <li><a href="#"><span className="list_icon"><img src={require("./images/icon_01.png")} alt="up" /></span> CATS</a></li>
                      <li><a href="#"><span className="list_icon"><img src={require("./images/icon_02.png")} alt="up" /></span> Dogs</a></li>
                      <li><a href="#"><span className="list_icon"><img src={require("./images/icon_03.png")} alt="up" /></span> Birds</a></li>
                      <li><a href="#"><span className="list_icon"><img src={require("./images/icon_04.png")} alt="up" /></span> Rabbit</a></li>
                      {
                        this.state.catArr.map((k,i)=>                     
                        <li><a href="#"><span className="list_icon"><img className="iconImg" src={'http://localhost:4444/'+ this.state.catArr[i]} alt="up" /></span>{this.state.catNameArr[i]}</a></li>
                        )}
                    </ul>
                  </div>
                </div>
                <div className="rght_cate">
                  <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
                  <div className="sub_dwn">
                    <div className="feat_sec">
                      <div className="feat_sec_img"><img src={require("./images/feat_img1.png")} alt="image" /></div>
                      <div className="feat_txt">Cats</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">Cats</div>
                      </div>
                    </div>
                    <div className="feat_sec">
                      <div className="feat_sec_img"><img src={require("./images/feat_img2.png")} alt="image" /></div>
                      <div className="feat_txt">Dogs</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">Dogs</div>
                      </div>
                    </div>
                    <div className="feat_sec">
                      <div className="feat_sec_img"><img src={require("./images/feat_img3.png")} alt="image" /></div>
                      <div className="feat_txt">Rabbits</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">Rabbits</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content_lft">
                <div className="contnt_1">
                  <div className="list_1">
                    <ul>
                      <li>
                        <input type="checkbox" className="chk_bx" />
                        Friends</li>
                      <li>
                        <input type="checkbox" className="chk_bx" />
                        Flaged</li>
                    </ul>
                  </div>
                  <div className="post_div">
                    <div className="post_list">
                      <ul>
                        <li onClick={this.latest}><a href="#"><span className="list_img"><img src={require("./images/img_1.png")} /></span>Latest First</a></li>
                        <li onClick={this.oldest}><a href="#"><span className="list_img"><img src={require("./images/img_2.png")} /></span>Oldest First</a></li>
                        <li><a href="#"><span className="list_img"><img src={require("./images/img_3.png")} /></span>Most Pet</a></li>
                        <li><a href="#"><span className="list_img"><img src={require("./images/img_4.png")} /></span>Most Clicks</a></li>
                        <li><a href="#"><span className="list_img"><img src={require("./images/img_5.png")} /></span>Most Commented</a></li>
                      </ul>
                    </div>
                    <div className="post_txt">4 New Post Updates</div>
                  </div>
                </div>
                <div>
                {/* {console.log("file state in html "+JSON.stringify(this.state.files.length))} */}
                {this.state.imgarr.map((k,s)=>
// <img src={'http://localhost:8000/'+ this.state.imgarr[s]}/>
<div className="contnt_2">
<div className="div_a">
<a href={'/single/'+this.state.idArr[s]}>
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
  </a>
  <div className="div_btm">
    <div className="btm_list">
      <ul>
        <li><a href="#"><span className="btn_icon"><img src={require('./images/icon_001.png')} alt="share" /></span>Share</a></li>
        <li><a href="#"><span className="btn_icon"><img src={require('./images/icon_002.png')} alt="share" /></span>Flag</a></li>
        <li><a href={'/single/'+this.state.idArr[s]}><span className="btn_icon"><img src={require('./images/icon_004.png')} alt="share" /></span> Comments</a></li>
        <div className="like_count"><span className="lft_cnt" /><span className="mid_cnt">{this.state.comments[s]}</span><span className="rit_cnt" /></div>
        <li onClick={()=>this.like(s)}><a href="#" ><span className="btn_icon" ><img src={require('./images/icon_003.png')} alt="share" /></span>Likes</a></li>
        <div className="like_count" style={{marginRight: '10px'}}><span className="lft_cnt" /><span className="mid_cnt">{this.state.likes[s]}</span><span className="rit_cnt" /></div>
        <li onClick={()=>this.dislike(s)}><a href="#"><span className="btn_icon"><img src={require('./images/icon_003.png')} alt="share" /></span>Unlike</a></li>
        <div className="like_count"><span className="lft_cnt" /><span className="mid_cnt">{this.state.dislikes[s]}</span><span className="rit_cnt" /></div>
      </ul>
    </div>
  </div>
</div>
</div>
     )}
     
                </div>
              </div>
            </div>
            <div className="clear" />
          </div>
        )
    }
}