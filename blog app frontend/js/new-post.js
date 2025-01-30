
const API_URL = "http://localhost:8000/api/posts";

const submitNewPost = () => {


    const title = document.getElementById('form-post-title').value;
    const postContent = document.getElementById('form-post-content').value;
    const fileInput = document.getElementById('form-post-image'); // Get the file input element
    const file = fileInput.files[0]; 

    let data = new FormData();
    data.append("post-image", file);
    data.append("title", title);
    data.append('content', postContent);

    // send request to backend server

    fetch(API_URL, {
        method: "POST",
        body: data
    }).then(()=>{
        setTimeout(()=>{
            window.location.href = 'index.html';
        },1000)
   
    })
    
    
}


