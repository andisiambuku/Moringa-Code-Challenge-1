// write your code here

// creating variables for the various elements to be manipulated in the DOM
const cardTitle = document.querySelector('#card-title')
const cardImage = document.querySelector('#card-image')
const commentList = document.querySelector('#comments-list')
const commentForm = document.querySelector('#comment-form')
const likerButton = document.querySelector('#like-button')
const likerCounter = document.querySelector('#like-count')

commentList.innerHTML = " "

let serverInfo;

//function to fetch data from the server and have the response in json format
function getServerData(){
    return fetch('http:://localhost:3000/images')
    .then(resp=>resp.json())
}

//function to update the dom with the images' titles
function updateDom(){
    serverInfo.forEach(image=>{
        cardTitle.textContent=image.titlecardImage.src=image.image
    });
}

//function to get user comments
let userComments = [];
function getComments() {
    return fetch("http://localhost:3000/comments")
    .then((resp)=> resp.json())
}

// function to update user comments
function updateComments(){
    userComments.forEach((comment)=>{
        const opinionList = document.createElement("li");
        opinionList.textContent = comment.content;
        commentList.append(opinionList);
    });
}

// function to post the comments
function postComments(comment){
    fetch("http://localhost:3000/comments",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            imageId:1,
            content:`${comment}`,
        })
    })
}

// adding eventlisteners for the like feature
document.addEventListener('DOMContentLoaded', async()=>{
    serverInfo = await getServerData()
    let likerCounter = serverInfo[0].likes
    //console.log(serverInfo[0].likes)
    updateDom(serverInfo)

    updateComments()
    userComments = await getComments();
    //console.log(userComments)
    updateComments(userComments);

    likerButton.addEventListener('click', ()=>{
        if(likerButton.textContent === "♥️"){
            likerButton.textContent = "♡";
            likerCounter = likerCounter - likerCounter;
        }else{
            likerButton.textContent = "♥️";
            likerCounter++;
        }
        likeONDom.textContent = `${likerCounter} likes`;
    })
// form eventlistener for the project
FormData.addEventListener('submit', (event) =>{
    event.preventDefault()
    postComments(event.target.comment.value)
})

})





