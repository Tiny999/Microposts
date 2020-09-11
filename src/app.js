import { http } from './http';
import { ui } from './ui';


// Get Posts on DOM Load
document.addEventListener('DOMContentLoaded', getPosts);

// Add Post Event
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Delete Post Event
document.querySelector('#posts').addEventListener('click', deletePosts);

// Get Posts from server
function getPosts(){
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPosts(data))
  .catch(err => console.log(err));
}

// Add Posts
function submitPost(e){
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  const data = {
    title,
    body
  }

  // Create Post 
  http.post('http://localhost:3000/posts', data)
  .then(data => {
    ui.showAlert('Post added', 'alert alert-success');
    ui.clearFields()

    getPosts();
  })
  .catch(err => console.log(err));
};

// Delete Posts
function deletePosts(e){
  if(e.target.parentElement.classList.contains('delete')){
    const id = e.target.parentElement.dataset.id;

    if(confirm("Are You Sure?")){
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post Deleted', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }

  e.preventDefault();
}