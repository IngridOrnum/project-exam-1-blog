const editPostBtn = document.querySelector('.edit-btn');
const deletePostBtn = document.querySelector('.delete-btn');
const saveEditBtn = document.querySelector('.save-btn');

fetch('https://v2.api.noroff.dev/blog/posts/IngridOrnum')
    .then(res => res.json())
    .then(data => {
        data.data.forEach(blogPost => {
            // extracting the date part from the timestamp with slice
            const date = blogPost.created.slice(0,10);
            const blogPostsDisplay =
                `
<div class="single-blog-display-edit">
<li>Title: ${blogPost.title}</li>
<div class="author-date-edit-page">
<li>Author: ${blogPost.author.name}</li>
<li>Date: ${date}</li>
</div>
<div class="edit-delete-btns">
<button class="edit-btn">Edit</button>
<button class="delete-btn">Delete</button>
<button class="save-btn">Save</button>
</div>
<div class="edit-dropdown">
    <form class="edit-form">
    <div class="line-divider"></div>
    
    <label for="img-url-hero"></label>
    <input id="img-url-hero" placeholder="Img URL - Hero" type="text">
    
    <label for="new-title"></label>
    <input id="new-title" placeholder="New Title" type="text">
    
        <div class="line-divider"></div>
        
    <label for="first-paragraph"></label>
    <input id="first-paragraph" placeholder="First paragraph" type="text">
    
    <label for="img-url-1"></label>
    <input id="img-url-1" placeholder="Img URL" type="text">
    
        <div class="line-divider"></div>
        
    <label for="second-paragraph"></label>
    <input id="second-paragraph" placeholder="First paragraph" type="text">
    
    <label for="img-url-2"></label>
    <input id="img-url-2" placeholder="Img URL" type="text">
    
    <div class="line-divider"></div>
    
    <label for="third-paragraph"></label>
    <input id="third-paragraph" placeholder="First paragraph" type="text">
    
    <label for="img-url-3"></label>
    <input id="img-url-3" placeholder="Img URL" type="text">
        
</form>
</div>
</div>`;
            document.querySelector('.ul-all-posts-edit-page').insertAdjacentHTML('beforeend', blogPostsDisplay);
        });
    })
    // update error catch later
    .catch(error => console.log(error))
