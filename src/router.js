var express = require("express");
var router = express.Router();
var api = require("./userapi");
var multer = require("multer");
var schema = require("./schema");
var images = schema.image;
var storage = multer.diskStorage({
    destination: function(req, res, done){
        done(null,'uploads/');
    },
    filename: function(req, file, done){
        done(null, file.originalname)
    }
})
var upload = multer({storage:storage});

router.get('/',(req,res)=>{
res.redirect("http://localhost:3000/")
});
// router.get('/post',(req,res)=>{
//     res.sendFile(__dirname+'/form.html');
// })
router.post('/post',function(req,res){
    // console.log(req.body);
    api.findUser(req.body,function(err,result){
        if(err){
            console.log(err);
            res.send(err);
        } 
        else if(result.length>0){
            // console.log("router"+result)
            console.log("Email already exists!");
            res.send("Email already exists!");
        }
        else{
            api.addUser(req.body, function(err,result){
                if(err){
                console.log(err);
                res.send(err);
                }
                else{
                    // console.log('1');
                    // console.log("before result"+JSON.stringify(req.body));
                    // console.log(result);
                    // res.send("Successful!");
                    api.otp(req.body.email, (err, result)=>{
                        // console.log('vsdfv');
                        if(err){
                            res.send(err)
                        }
                        else{
                            // console.log('Sending mail!');
                            api.sendMail(req, function(err, result){
                                // console.log('mail is on the way');
                                if(err)
                                res.send(err);
                                else{
                                    // console.log("Hi!")
                                    // res.sendFile(__dirname+'/otp.html');
                                    res.send("REGISTERED");
                                }
                            })
                        }   
                    })
                }
            })

        }
    })
});

router.post('/verify',(req,res)=>{
    api.findUser(req.body,function(err,result){
        if(err){
            console.log(err);
            res.send(err);
        }
        else if(result.length==0){
            // console.log(result)
            // console.log("Email already exists!");
            res.send("Email not registered!");
        }
        else{
            var response = res;
            api.checkotp(req.body,response, (err,result)=>{
            
                if(err)
                res.send(err);
                else if(result)
                res.send('OTP is incorrect!');
            })
        }
    })
})

// router.get('/signin',(req,res)=>{
//     console.log("login 1");
//     // res.sendFile(__dirname+'/hello.html');
//     // console.log(__dirname);
// })

router.post('/login',(req,res)=>{
     console.log('router ki body'+JSON.stringify(req.body));
    api.findUser(req.body, function(err,result){
        console.log("Reached login router");
        if(err){
            console.log(err);
            res.send(err);
        }
        else if(result.length==0){
            console.log("Email 0");
            // console.log(JSON.stringify(req.body));
            res.send("You need to Sign Up first!");
        }
        else{
            // res.send('Login!');
            api.login(req.body,function(err, result){
                if(err){
                    console.log(err);
                    res.send(err);
                }
                else if(result.length==0){
                    console.log('0');
                    res.send("Password is incorrect!");
                }
                else{
                    res.send('Login Successful!')
                }
            })
        }
    })
})
// router.get('/upload',function(req,res){
//     res.sendFile(__dirname+"/upload.html");
// })
router.post('/upload',upload.single('file'),function(req,res){
    // console.log("Upload from router.");
    // console.log(req);
    // res.send(file);
    // console.log("req in router upload"+JSON.stringify(req.file));
    console.log("body="+JSON.stringify(req.body))   
    api.addImage(req.file,req.body.description,req.body.category,req.body.mail,function(err,result){
        if(err){
            // console.log("Err in router image : " + err);
            res.send(err );
        }
        else{
            api.findImage(req.file,function(err,result){
                if(err){
                    res.send(err);
                }
                else{
                    // console.log("length of res in router "+result.length);
                    res.send(result);
                }
            })
            // console.log("Reached router image else");
        }
    })
    
    // res.send("Your file has been received!");
    // res.redirect("http://localhost:3000/")

})
router.post('/getPosts',function(req,res){
    api.findImage(req.file,function(err,result){
        if(err){
            res.send(err);
        }
        else{
            // console.log("length of res in router "+result.length);
            res.send(result);
        }
    })
})
router.post('/getSinglePost',function(req,res){
    console.log("req="+ req.body)
    console.log("get single post = "+JSON.stringify(req.body));
    api.getSingle(req.body,function(err,result){ 
        if(err){
            res.send(err);
        }
        else{
            // console.log("length of res in router "+result.length);
            res.send(result);
        }
    })
})
router.post('/addComment',(req,res)=>{
    console.log("add comment body"+JSON.stringify(req.body));
    api.addComment(req.body,function(err,result){
        if(err){
            res.send(err);
        }
        else{
            api.incComment(req.body,(err,result)=>{
                if(err){
                    res.send(err);
                }
                else{
                    res.send(result);
                }
            })
        }
    })
})
router.post('/getComment',(req,res)=>{
    console.log("this is get comments in router");
    api.getComments(req.body,function(err,result){
        console.log("get amnts api result"+result);
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})
router.post('/addCat',upload.single('file'),(req,res)=>{
    console.log("body for add cat",JSON.stringify(req.body.cat));
    console.log("file for add cat",JSON.stringify(req.file));
    api.findCat(req.body.cat,function(err,result){
        if(err){
            console.log(err);
            res.send(err); 
        }
        else if(result.length!=0){
            res.send("Category already Exists!");
        }
        else{
            api.addCat(req.file,req.body.cat,function(err,result){
                if(err){
                    console.log("err in add cat router = "+err);
                    res.send(err);
                }
                else{
                    api.getCat(function(err,result){
                        if(err){
                            res.send(err);
                        }
                        else{
                            // console.log("length of res in router "+result.length);
                            res.send(result);
                        }
                    })
                }
            })
        }
    })
})
router.post('/getCat',(req,res)=>{
    api.getCat(function(err,result){
                if(err){
                    res.send(err);
                }
                else{
                    // console.log("length of res in router "+result.length);
                    res.send(result);
                }
            
    })
})
router.post('/like',(req,res)=>{
    console.log("body in router like "+JSON.stringify(req.body));
    api.getLikes(req.body,(err,result)=>{
        if(err){
            console.log("err in getlike api "+err);
            res.send(err);
        }
        else if(result.length!=0){
            console.log("len of result"+result.length);
            res.send("Already Liked");
        }
        else{
            api.like(req.body,function(err,result){
                console.log("whats this : "+result);
                if(err){
                    console.log("here is error")+err;
                    res.send(err);
                }
                else{
                    // console.log("length of res in router "+result.length);
                    res.send(result);
                }
            })
        }
    })
})
router.post('/dislike',(req,res)=>{
    console.log("body in router dislike "+JSON.stringify(req.body));
    api.getDislikes(req.body,(err,result)=>{
        if(err){
            console.log("err in getlike api "+err);
            res.send(err);
        }
        else if(result.length!=0){
            console.log("len of result"+result.length);
            res.send("Already Liked");
        }
        else{
            api.dislike(req.body,function(err,result){
                console.log("whats this : "+result);
                if(err){
                    console.log("here is error")+err;
                    res.send(err);
                }
                else{
                    // console.log("length of res in router "+result.length);
                    res.send(result);
                }
            })
        }
    })
})
module.exports = router;