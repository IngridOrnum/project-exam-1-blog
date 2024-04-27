document.addEventListener('DOMContentLoaded', function () {
    const postsContainer = document.querySelector('.ul-all-posts-edit-page');

    function fetchUserBlogPosts() {
        const username = sessionStorage.getItem('username');
        fetch(`https://v2.api.noroff.dev/blog/posts/${username}`, {
            method: 'GET',
            headers: getHeaders()
        })
            .then(res => res.json())
            .then(data => {
                data.data.forEach(blogPost => {
                    const blogPostElement = createBlogPostElement(blogPost);
                    postsContainer.appendChild(blogPostElement);
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
                            <label for="img-url-hero"></label>
                            <input id="img-url-hero" placeholder="Img URL - Hero" type="text">
                            <label for="alt-img-hero"></label>
                            <input id="alt-img-hero" placeholder="Image description" type="text">
                            <label for="new-title"></label>
                            <input id="new-title" placeholder="New Title" type="text">
                            <label for="tags"></label>
                            <input id="tags" placeholder="Tags" type="text">
                            <div class="line-divider"></div>
                            <span><label for="first-paragraph">First Paragraph:</label></span>
                            <textarea id="first-paragraph" name="first-paragraph" cols="100" rows="5"></textarea>
                            <label for="img-url-1"></label>
                            <input id="img-url-1" placeholder="Img URL" type="text">
                            <label for="alt-img-1"></label>
                            <input id="alt-img-1" placeholder="Image description" type="text">
                            <div class="line-divider"></div>
                            <span><label for="second-paragraph">Second Paragraph:</label></span>
                            <textarea id="second-paragraph" name="second-paragraph" cols="100" rows="5"></textarea>
                            <label for="img-url-2"></label>
                            <input id="img-url-2" placeholder="Img URL" type="text">
                            <label for="alt-img-2"></label>
                            <input id="alt-img-2" placeholder="Image description" type="text">
                            <div class="line-divider"></div>
                            <span><label for="third-paragraph">Third Paragraph:</label></span>
                            <textarea id="third-paragraph" name="third-paragraph" cols="100" rows="5"></textarea>
                            <label for="img-url-3"></label>
                            <input id="img-url-3" placeholder="Img URL" type="text">
                            <label for="alt-img-3"></label>
                            <input id="alt-img-3" placeholder="Image description" type="text">
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

    function deleteSinglePost(event) {
        const element = event.target.closest('.single-blog-display-edit');
        const postId = element.dataset.id;  // Get the postId from the element's data-id attribute
        const username = sessionStorage.getItem('username');

        fetch(`https://v2.api.noroff.dev/blog/posts/${username}/${postId}`, {
            method: 'DELETE',
            headers: getHeaders()
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


    function fetchBlogPostAndFillForm(postId, formElement) {
        const username = sessionStorage.getItem('username');
        fetch(`https://v2.api.noroff.dev/blog/posts/${username}/${postId}`, {
            method: 'GET',
            headers: getHeaders()
        })
            .then(response => response.json())
            .then(post => {
                console.log(post);
                populateForm(formElement, post);
            })
            .catch(error => console.error('Failed to fetch post for editing:', error));
    }

    function populateForm(form, postData) {
        if (!postData || !postData.data) return; // Exit if no postData or no data inside postData
        const { title, tags, body, media } = postData.data;
        form.querySelector('#new-title').value = title || '';
        form.querySelector('#tags').value = tags ? tags.join(', ') : '';
        const paragraphs = body.split('\n\n');
        form.querySelector('#first-paragraph').value = paragraphs[0] || '';
        form.querySelector('#second-paragraph').value = paragraphs[1] || '';
        form.querySelector('#third-paragraph').value = paragraphs[2] || '';
        form.querySelector('#img-url-hero').value = media.url || '';
        form.querySelector('#alt-img-hero').value = media.alt || '';
    }

    function extractDataFromForm(form) {
        return {
            title: form.querySelector('#new-title').value.trim(),
            tags: form.querySelector('#tags').value.split(',').map(tag => tag.trim()).filter(tag => tag),
            body: [
                form.querySelector('#first-paragraph').value.trim(),
                form.querySelector('#second-paragraph').value.trim(),
                form.querySelector('#third-paragraph').value.trim()
            ].join('\n\n'),
            media: {
                url: form.querySelector('#img-url-hero').value.trim(),
                alt: form.querySelector('#alt-img-hero').value.trim()
            }
        };
    }

    function editSingleBlogPost(event) {
        const form = event.target.closest('.single-blog-display-edit').querySelector('.edit-form');
        const postId = event.target.closest('.single-blog-display-edit').dataset.id;
        const updatedPostData = extractDataFromForm(form);  // Use the function to extract data from the form

        const username = sessionStorage.getItem('username');
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
                    closeEditDropdown(event); // Close the form on success
                } else {
                    response.json().then(data => alert('Error - ' + data.message)); // More detailed error information
                }
            })
            .catch(error => console.error('Error updating post:', error));
    }

    function getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        };
    }

    fetchUserBlogPosts();
});