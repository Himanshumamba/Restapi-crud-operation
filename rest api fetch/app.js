const postlist =document.querySelector('.post-lists');
const addPostForm =document.querySelector('.add-post-form');
const titleValue = document.getElementById('title-value');
const bodyValue = document.getElementById('body-value');

var btnSubmit= document.querySelector('.btn');

var url ='https://jsonplaceholder.typicode.com/posts';
let output ='';
const renderPosts= (posts)=>{
    
posts.forEach(post => {
    output+=`    <div class="card  mt-4 col-md-6"  style="width: 18rem;">
    <div class="card-body" data-id = ${post.id}>
      <h5 class="card-title">${post.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
      <p class="card-text">${post.body}</p>
      <a href="#" class="card-link">Edit</a>
      <a href="#" class="card-link">Delete</a>
    </div>
  </div>
</div>`;
    
});
postlist.innerHTML=output;


}
//get Read post
fetch(url)
.then(res=>res.json())
.then(data=> renderPosts(data));

postlist.addEventListener('click', (evt)=>{
  
  evt.preventDefault();
let delButtonPressed = evt.target =='delete-post';
let editButtonPressed = evt.target== 'edit-post';
let id =evt.target.parentElement.dataset.id;



if(delButtonPressed === false){
  fetch(`${url}/${id}`,{
    method:'DELETE',
    

   }).then (res=>res.json())
     .then(()=>location.reload())

}

if(editButtonPressed === false){

const parent = evt.target.parentElement;
let titleContent =parent.querySelector('.card-title').textContent;
let bodyContent =parent.querySelector('.card-text').textContent;
titleValue.value =titleContent;
bodyValue.value=bodyContent;


}
//update = update the existing posts
btnSubmit.addEventListener('click',(e)=>{
e.preventDefault();
  fetch(`${url}/${id}`,{
    method:'PATCH',
    headers :{
            'Content-type': 'application/json; charset=UTF-8',
        }, 
        
        body:JSON.stringify({
          title:titleValue.value,
          body:bodyValue.value,
      }).then(res =>res.json())
      .then(()=>location.reload())

  })

  
})

//restting input fields


});

// Insert New posts method post

addPostForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    fetch(url,{
        method :'POST',
        headers :{
            'Content-type': 'application/json; charset=UTF-8',
        },
        body:JSON.stringify({

            title:titleValue.value,
            body:bodyValue.value,
        })
    })
     .then(res=>res.json())
       .then(data=>{
 
     const dataArra =[];
     dataArra.push(data);
     renderPosts(dataArra);
     })

})

