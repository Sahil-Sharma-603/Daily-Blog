/**
 * TODO (Together): Create getPostIdParam to get the id of the post to use in the request later
 * TODO: Complete getPost function to get post data from API
 * TODO: Complete buildPost function to fill in the post data in the post.html file using ids
 */

const API_URL = "http://localhost:8000/api/posts/";
const API_BASE_URL = "http://localhost:8000/";

window.onload = () => {
    getPost();
    // getPostIdParam();
}

const getPostIdParam = () => {
    // gives the full link of the url
    const queryString  = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    // gives the id of the webpage
    // console.log(urlParams.get("id"));
    return urlParams.get("id");
}

const getPost = () => {
    // CODE GOES HERE
    const postId = getPostIdParam();
    fetch(`${API_URL}${postId}`,{
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        buildPost(data);
    })
}

const buildPost = (data) => {

    console.log(data);

    let postData = "";
    const postDate = new Date(parseInt(data.added_date)).toDateString();
    const postImage = `${API_BASE_URL}${data.post_image}`;
    postData += `
        <div class = "post-container">
            <div class = "navigation"><a href="index.html"> Back </a> </div>    
            <div id = "individual-post-title">${data.title}</div>
            <div id = "individual-post-date"> ${postDate}</div>
            <div id = "individual-post-content">${data.content}</div>
            <div class = "post-image" style = "background-image : url(${postImage})"></div>

        </div>

    `

    document.querySelector('.post-main-container').innerHTML = postData;
    document.querySelector("header").style.backgroundImage =`url(${postImage})`
   

}

