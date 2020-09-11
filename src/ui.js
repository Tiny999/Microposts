class UI{
  constructor(){
    this.posts = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.forState = 'add';
  }

  showPosts(posts){
    let output = '';

    posts.forEach(post => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4> 
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}"><i class="fa fa-pencil"></i></a>

            <a href="#" class="delete card-link" data-id="${post.id}"><i class="fa fa-remove"></i></a>
          </div>
        </div>
      `;
    });

    this.posts.innerHTML = output;
  }

  showAlert(msg, className){
    this.clearAlert();

    // Create a div
    const div = document.createElement('div');

    // add classes
    div.className = className;

    // add text
    div.appendChild(document.createTextNode(msg));

    // insert to dom
    const container = document.querySelector('.post-container');
    const posts = document.querySelector('#posts');

    container.insertBefore(div, posts);

    // Clear after 3 secs
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert(){
    const currentAlert = document.querySelector('.alert');

    if(currentAlert){
      currentAlert.remove();
    }
  }

  clearFields(){
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

}

export const ui = new UI();