const express = require("express");
const app = express();

const { v4: uuidv4 } = require('uuid');

var multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

// importing post.js
const Post = require("./api/posts.js");
const postData = new Post();

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    next();
})

app.use('/uploads', express.static('uploads'));

// convert json to javascript object
app.use(express.json());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
  })
  
  var upload = multer({ storage: storage })


  const getExt = (mimeType) => {
    switch(mimeType){
        case "image/png":
            return ".png";
        case "image/jpeg":
            return ".jpeg";
    }
  }
// get request
app.get("/api/posts", (req, res)=>{

    // const testing = [{"testing" : "this is test"}]
    // postData.add(testing)
    res.status(200).send(postData.get());

})

// find post based on id
app.get("/api/posts/:post_id", (req, res) =>{
    const postId = req.params.post_id;
    const foundPost = postData.getIndividualBlog(postId);
    if(foundPost){
    res.status(200).send(foundPost)
    }else{
        res.status(404).send("Not Found");
    }
})

app.post("/api/posts", upload.single('post-image'),(req, res) =>{
    const data = req.body;
    console.log(data);
    const newPost = {
        "id": `${uuidv4()}`,
        "title": req.body.title,
        "content": req.body.content,
        "post_image": req.file.path,
        "added_date": `${Date.now()}`
    }

    postData.add(newPost);

    
    res.status(201).send(newPost);

})

// Initializing the server.
 
app.listen(8000, ()=> {
    console.log("Listening on local host 8000")
});


