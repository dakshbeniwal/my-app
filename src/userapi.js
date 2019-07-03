var schema = require("./schema");
var users = schema.user;
var images = schema.image;
var cat = schema.cat;
var comments = schema.comment;
var otps = require('./schema');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mr.beniwal17@gmail.com',
        pass: ''
    }
});
var mailOptions = {
    from: 'mr.beniwal17@gmail.com',
    to: 'dakshbeniwal7@gmail.com',
    subject: 'Hello',
    text: 'Chai pee lo!'
};
module.exports = {
    addImage: function(data,des,cat,mail,done){
        // console.log("des = "+des+" cat = "+cat)
        images.create({filename:data.filename,description:des,category:cat,email:mail,like:0,likedBy:[],dislike:0,dislikedBy:[],comments:0}, function(err,result){
        // console.log("data in image api"+JSON.stringify(data));
        if(err){
            console.log("Image api err : " + err);
            return done(err.null);
        }
        else{
            // console.log("Reached api image else");
            return done(null,result);
        } 
    })
},
findUser: function(data, done){
    console.log("find data "+JSON.stringify(data));
    var newMail = data.email;
    users.find({"email":newMail},function (err,result){
        if(err){
        console.log("user find err " +err);
        return done(err, null);
        }
        else{
            console.log("user find result "+result);
        // console.log("Email already exists!");
        return done(null, result);
        }
    })

},
    login : function(data,done){
        let pass = data.password;
        let mail = data.email; 
        // console.log('api ki mail'+mail);
        users.find({$and: [{"email":mail},{"password":pass}]},function(err,data){
            if(err){
                return done(err,null);
            }
            else{
                return done(null,data);
            }
        })
    },
    addUser : function(data, done){
        // console.log("add data "+JSON.stringify(data));
        users.create(data, function(err,result){
            if(err){
                // console.log("create err "+err);
            return done(err,null);
            }
            else{
                // console.log("create result "+result);
            return done(null, result);
            }
        })
    },
    
    sendMail: function(data,done){
    //    console.log(data.email);
        // console.log(otpTemp);
        mailOptions.text = JSON.stringify(otpTemp);
        transporter.sendMail(mailOptions,function(err,result){
            if(err){
                return done(err, null);
            }
            else{
                return done(null, result);
            }
        })
    },
    otp : function (data, done){
        mailOptions.to = data;
        // mailTemp = data.email;
        // console.log(otpTemp);
        users.update({email:data},{$set:{otp:otpTemp,verified:false}}, function(err, result){
            if(err)
            return done(err, null);
            else
            return done(null, result);
        })
    },
    checkotp : (data, res, done)=>{
        users.find({$and:[{email:data.email},{otp:data.otp}]},(err,result)=>{
            // console.log(result.length);
            if(err)
            return done(err, null);
            else if(result.length==0){
                return done(null, result);
            }
            else{
                users.updateOne({email:data.email},{$set:{verified:true}},(err,res)=>{
                    if(err)
                    console.log(err);
                    else{
                        // console.log(res);
                    }
                });
                res.send("Verified!");
                // console.log(data.email);               
            }
        })
    },
    findImage : (data, done)=>{
        // console.log("what is this = "+JSON.stringify(data))
        // var date = new Date();
        // console.log("date is "+date.toISOString())
        images.find({"__v":0},function(err,result){
            if(err){
                return done(err,null)
            }
            else{
                return done(null,result)
            }
        })
    },
    addCat : (data,name,done)=>{
        cat.create({catIcon:data.filename,catName:name},function(err,result){
            if(err){
                return done(err, null);
            }
            else{
                return done(null, result);
            }
        })
    },
    getCat : (done)=>{
        cat.find({'__v':0},function(err,result){
            if(err){
                return done(err,null)
            }
            else{
                return done(null,result)
            }
        })
    },
    findCat : (data,done)=>{
        console.log("find cat filename = "+JSON.stringify(data));
        cat.find({'catName':data},(err,result)=>{
            if(err){
                return done(err,null)
            }
            else{
                return done(null,result)
            }
        })
    },
    getSingle:(data,done)=>{
        console.log("get single data"+JSON.stringify(data.id));
        images.find({'_id':data.id},function(err,result){
            if(err){
                return done(err,null)
            }
            else{
                return done(null,result)
            }
        })
    },
    incComment:(data,done)=>{
        images.updateOne({'_id':data.postid},{$inc:{'comments':1}},(err,result)=>{
            if(err){
                return done(err,null)
            }
            else{
                return done(null,result)
            }
        })
    },
    addComment:(data,done)=>{
        comments.create(data,(err,result)=>{
            if(err){
                return done(err,null)
            }
            else{
                return done(null,result)
            }
        })
    },
    getComments:(data,done)=>{
        console.log("get cmnts in api");
        comments.find({'postid':data.id},(err,result)=>{
            // console.log("get cmnts result"+result);
            if(err){
                return done(err,null) 
            }
            else{
                return done(null,result)
            }
        })
    },
    like:(data,done)=>{
        var temp = 'ObjectId("'+data.id+'")';
        console.log("like in api" + temp);
        images.findByIdAndUpdate(data.id,{$inc:{'like':1},$push:{'likedBy':data.mail}},(err,result)=>{
            if(err){
                console.log("err in like api"+err);
                        return done(err,null) 
                    }
                    else{
                        console.log("result in like api"+JSON.stringify(result));
                        return done(null,result)
                    }
        })
    },
    getLikes:(data,done)=>{
        images.find({$and:[{'likedBy':data.mail},{'_id':data.id}]},(err,result)=>{
            if(err){
                console.log("err in getlike api"+err);
                        return done(err,null) 
                    }
                    else{
                        console.log("result in getlike api"+JSON.stringify(result));
                        return done(null,result)
                    }
        })
    },
    dislike:(data,done)=>{
        var temp = 'ObjectId("'+data.id+'")';
        console.log("like in api" + temp);
        images.findByIdAndUpdate(data.id,{$inc:{'dislike':1},$push:{'dislikedBy':data.mail}},(err,result)=>{
            if(err){
                console.log("err in like api"+err);
                        return done(err,null) 
                    }
                    else{
                        console.log("result in like api"+JSON.stringify(result));
                        return done(null,result)
                    }
        })
    },
    getDislikes:(data,done)=>{ 
        images.find({$and:[{'dislikedBy':data.mail},{'_id':data.id}]},(err,result)=>{
            if(err){
                console.log("err in getlike api"+err);
                        return done(err,null) 
                    }
                    else{
                        console.log("result in getlike api"+JSON.stringify(result));
                        return done(null,result)
                    }
        })
    }
}

var otpTemp = Math.floor(Math.random()*8999)+1000;