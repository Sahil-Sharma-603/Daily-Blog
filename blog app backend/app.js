const express = require("express");
const app = express();

const Post = require("./api/posts.js");
const postData = new Post();

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    next();
})

app.use('/uploads', express.static('uploads'));

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

// Initializing the server.
 
app.listen(8000, ()=> {
    console.log("Listening on local host 8000")
});

