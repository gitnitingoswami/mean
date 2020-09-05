const exprees = require('express');
const routes = exprees.Router();
const Post = require('../post');
const multer = require("multer");
const auth =require('./middler/auth-user')



const MIME_TYPE_MAP={
  'image/png':'png',
  'image/jpeg':'jpg',
  'image/jpg':'jpg'
};

var storage =multer.diskStorage({
 
  destination:(req,file,cb)=>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("please enter write extension");
    if(isValid){
    error =null;  
    }
    cb(error,"backend/images");

  },
  filename:(req,file,cb)=>{
    const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
    const ext =MIME_TYPE_MAP[file.mimetype];
    cb(null,name+'-'+Date.now()+ '.'+ext);
  }
})
var upload = multer({ storage: storage })
routes.post('',auth,upload.single("image"),(req,res,next)=>{
  const url =req.protocol+'://'+req.get('host');
    const post= new Post({
        title:req.body.title,
        content:req.body.content,
        imagePath:url+'/images/'+req.file.filename
    });
    post.save().then(postCreate=>{
    console.log("responce")  ;
  console.log(postCreate);
 
    res.status(201).json({
        message:"post is added",
        post:{
          ...postCreate,
          _id:postCreate._id
        } });

    });
    
    });


routes.get('',(req,res)=>{
  const pageSize = +req.query.pagesize;
  const currentPage =req.query.page;
  const postQuery = Post.find();
  let fatchedPost;
  if(pageSize && currentPage){
    postQuery.
    skip(currentPage * (currentPage -1))
    .limit(pageSize);
  }
  postQuery.then(document=>{
    this.fatchedPost=document;
  return Post.count();
 
    
  }).then(count=>{
    res.status(200).json({
      message:"fetch sucessful",
      posts:this.fatchedPost,
      maxpost:count
  });
  });

    
});

routes.delete('/:id',auth,(req,res,next)=>{
  console.log("auth"+auth);
  console.log("viedow dekle");
    Post.deleteOne(req.param.id).then((results)=>{
        console.log(results)
        res.status(200).json({
      message:"post deleted"
  })
    })
   
  console.log(req.params.id);
  
});

routes.put('/:id',auth,
upload.single("image"),(req,res,next)=>{
  var imagePath = req.body.imagePath;
  console.log(imagePath);
  if(req.file){
    const url =req.protocol+'://'+req.get('host');
    imagePath=url+'/images/'+req.file.filename,
    console.log(imagePath);

  }
  console.log(imagePath);

  const post = new Post({
  _id:req.body._id,
    title:req.body.title,
    content:req.body.content,
    imagePath:imagePath,

  });
  console.log("image"+post.imagePath);
  console.log(post._id);
  Post.updateOne({_id:req.body._id},post).then((results)=>{
    console.log(req.body._id);
    console.log(results);
  
    res.status(203).json({
      message:"updated"
    })
  })
})



module.exports=routes;
