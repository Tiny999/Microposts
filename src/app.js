import { http } from './http';
import { ui } from './ui';


// Get Posts on DOM Load
document.addEventListener('DOMContentLoaded', getPosts);

// Add Post Event
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Delete Post Event
document.querySelector('#posts').addEventListener('click', deletePosts);

// Edit State Post Event
document.querySelector('#posts').addEventListener('click', enableEdit)

// Cancel Edit event
document.querySelector('.card-form').addEventListener('click', cancelEdit);

// Get Posts from server
function getPosts(){
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPosts(data))
  .catch(err => console.log(err));
}

// Add Posts
function submitPost(){
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  // Validate Inputs
  if(title === '' || body === ''){
    ui.showAlert('Please fill in all fields', 'alert alert-danger');
  } else{
    const data = {
      title,
      body
    }  

    // Check for id
    if(id === ''){

      // Create Post 
      http.post('http://localhost:3000/posts', data)
      .then(data => {
        ui.showAlert('Post added', 'alert alert-success');
        ui.clearFields();

        getPosts();
      })
      .catch(err => console.log(err));

    }else{

      // Update Post
      http.put(`http://localhost:3000/posts/${id}`, data)
      .then(data => {
        ui.showAlert('Post Updated', 'alert alert-success');
        ui.changeFormState('add');

        getPosts();
      })
      .catch(err => console.log(err));

    }
    
    
  }
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

// Enable edit
function enableEdit(e){
  if(e.target.parentElement.classList.contains('edit')){
    const id = e.target.parentElement.dataset.id;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

    const data = {
      id,
      title, 
      body
    }

    // Fill form with post to be edited
    ui.fillForm(data);
  }
}

// Cancel Edit state
function cancelEdit(e){
  if(e.target.classList.contains('post-cancel')){
    ui.changeFormState('add');

    e.preventDefault();
  }
}