document.addEventListener('DOMContentLoaded', function () {
    const postsContainer = document.querySelector('.ul-all-posts-edit-page');
    const username = sessionStorage.getItem('username');
    const headers = getHeaders();

    function fetchUserBlogPosts() {
        fetch(`https://v2.api.noroff.dev/blog/posts/${username}`, {
            method: 'GET',
            headers })
            .then(res => res.json())
            .then(data => {
                data.data.forEach(blogPost => {
                    postsContainer.appendChild(createBlogPostElement(blogPost));
                });
            })
            .catch(error => console.error('Error fetching blog posts:', error));
    }

    function createBlogPostElement(blogPost) {
        const date = blogPost.created.slice(0, 10);
        const element = document.createElement('div');
        element.classList.add('single-blog-display-edit');
        element.dataset.id = blogPost.id;
        element.innerHTML = `
            <li>Title: ${blogPost.title}</li>
            <div class="author-date-edit-page">
                <li>Author: ${blogPost.author.name}</li>
                <li>Date: ${date}</li>
            </div>
            <div class="edit-delete-btns">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
                <button class="save-btn">Save</button>
                <button class="close-btn">Close</button>
            </div>
            <div class="edit-dropdown" style="display: none;">
                <form class="edit-form">
                    <div class="line-divider"></div>
                    <label for="img-url">Img URL:</label>
                    <input id="img-url" type="text">
                    <label for="alt-img">Image description:</label>
                    <input id="alt-img" type="text">
                    <label for="title">Title:</label>
                    <input id="title" type="text">
                    <label for="tags">Tags:</label>
                    <input id="tags" type="text">
                    <label for="body-text">Text:</label>
                    <textarea id="body-text"  cols="100" rows="20"></textarea>
                </form>
            </div>
        `;
        attachButtonListeners(element);
        return element;
    }

    function attachButtonListeners(element) {
        element.querySelector('.edit-btn').addEventListener('click', displayEditDropdown);
        element.querySelector('.save-btn').addEventListener('click', editSingleBlogPost);
        element.querySelector('.close-btn').addEventListener('click', closeEditDropdown);
        element.querySelector('.delete-btn').addEventListener('click', deleteSinglePost);
    }

    function toggleEditDropdown(event, displayMode) {
        const editDropdown = event.target.closest('.single-blog-display-edit').querySelector('.edit-dropdown');
        const deleteBtn = event.target.closest('.single-blog-display-edit').querySelector('.delete-btn');
        const editBtn = event.target.closest('.single-blog-display-edit').querySelector('.edit-btn');
        const saveBtn = event.target.closest('.single-blog-display-edit').querySelector('.save-btn');
        const closeBtn = event.target.closest('.single-blog-display-edit').querySelector('.close-btn');

        editDropdown.style.display = displayMode ? "block" : "none";
        deleteBtn.style.display = displayMode ? "none" : "block";
        editBtn.style.display = displayMode ? "none" : "block";
        saveBtn.style.display = displayMode ? "block" : "none";
        closeBtn.style.display = displayMode ? "block" : "none";
    }

    function displayEditDropdown(event) {
        toggleEditDropdown(event, true);
        const postIdElement = event.target.closest('.single-blog-display-edit');
        const postId = postIdElement.dataset.id;
        fetchBlogPostAndFillForm(postId, postIdElement.querySelector('.edit-dropdown'));
    }

    function closeEditDropdown(event) {
        toggleEditDropdown(event, false);
    }

    function fetchBlogPostAndFillForm(postId, editDropdown) {
        fetch(`https://v2.api.noroff.dev/blog/posts/${username}/${postId}`, { method: 'GET', headers })
            .then(response => response.json())
            .then(post => addFormData(editDropdown, post))
            .catch(error => console.error('Failed to fetch post for editing:', error));
    }

    function addFormData(editDropdown, postData) {
        const { title, tags, body, media } = postData.data;
        editDropdown.querySelector('#title').value = title || '';
        editDropdown.querySelector('#tags').value = tags.join(', ') || '';
        editDropdown.querySelector('#body-text').value = body || '';
        editDropdown.querySelector('#img-url').value = media.url || '';
        editDropdown.querySelector('#alt-img').value = media.alt || '';
    }

    function editSingleBlogPost(event) {
        event.preventDefault();

        const postId = event.target.closest('.single-blog-display-edit').dataset.id;
        const form = event.target.closest('.single-blog-display-edit').querySelector('.edit-form');
        const updatedPostData = {
            title: form.querySelector('#title').value.trim(),
            tags: form.querySelector('#tags').value.split(',').map(tag => tag.trim()).filter(tag => tag),
            body: form.querySelector('#body-text').value.trim(),
            media: {
                url: form.querySelector('#img-url').value.trim(),
                alt: form.querySelector('#alt-img').value.trim()
            }
        };
        fetch(`https://v2.api.noroff.dev/blog/posts/${username}/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(updatedPostData)
        })
            .then(response => {
                if (response.ok) {
                    alert('Post updated successfully');
                    closeEditDropdown(event);
                } else {
                    response.json().then(data => alert('Error - ' + data.message));
                }
            })
            .catch(error => console.error('Error updating post:', error));
    }

    function deleteSinglePost(element) {
        const postId = element.dataset.id;
        fetch(`https://v2.api.noroff.dev/blog/posts/${username}/${postId}`, {
            method: 'DELETE',
            headers
        })
            .then(response => {
                if (response.ok) {
                    alert('Post deleted successfully');
                    element.remove();
                } else {
                    response.json().then(data => alert('Error - ' + data.message));
                }
            })
            .catch(error => console.error('Failed to delete post:', error));
    }

    function getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        };
    }

    fetchUserBlogPosts();
});