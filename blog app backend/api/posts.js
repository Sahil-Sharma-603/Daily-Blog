const PATH = "./data.json";
const { raw } = require('express');
const fs = require('fs');
const path = require('path');


class Post{

    get(){
        // get posts
        return this.readData();
    }

    getIndividualBlog(id){
        // get one blog posts
        const postData = this.readData();
        const result = postData.find((item) => item.id == id);
        return result;
    
    }

    add(newPost){
        // add new post
        const currPost = this.readData();
        //  shift the object at top of the array.
        currPost.unshift(newPost);
        this.storeData(currPost);
    }

    // read data json file 
    readData(){
        let rawdata = fs.readFileSync(PATH);
        let posts = JSON.parse(rawdata);
        return posts;
    }

    //store the new content in json file
    storeData(rawdata){
        let data = JSON.stringify(rawdata);
        fs.writeFileSync(PATH, data);

    }


   
}

module.exports = Post;


// command to format json file - shift + option + F