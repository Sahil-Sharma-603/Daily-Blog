

const API_URL = "http://localhost:8000/api/posts";
const API_BASE_URL = "http://localhost:8000/";

window.onload = () => {
    getPosts();
}

const getPosts = () => {
    fetch(API_URL, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data)=>{
        buildPosts(data);
    })
}

const buildPosts = (blogPosts) => {
    // console.log(blogPosts);
    let blogPostContent = "";
    
    
    for(post of blogPosts){
        const postLink = `/post.html?id=${post.id}`; // No spaces around '='
        const postDate = new Date(parseInt(post.added_date)).toDateString();
        const postImage = `${API_BASE_URL}${post.post_image}`;
        blogPostContent += `
            <a class = "post-link" href = "${postLink}">
                                    <div class = "post">
                                        <div class = "post-image" style = "background-image : url(${postImage})"></div>
                                        <div class = "post-content">
                                            <div class = "post-date">${postDate}</div>
                                            <div class = "post-title"><h4>${post.title}</h4></div>
                                            <div class = "post-text"> ${post.content} </div>
                                        </div>    
                                    </div>
            </a>
        `
    }
    document.querySelector('.blog-post').innerHTML = blogPostContent;
}