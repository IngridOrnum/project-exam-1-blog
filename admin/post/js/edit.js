document.addEventListener('DOMContentLoaded', function () {
    const postsContainer = document.querySelector('.ul-all-posts-edit-page');

    // display edit dropdown
    function toggleEditDropdown(event, displayMode) {
        const editDropdown = event.target.closest('.single-blog-display-edit').querySelector('.edit-dropdown');
        const deleteBtnEdit = event.target.closest('.single-blog-display-edit').querySelector('.delete-btn');
        const editBtn = event.target.closest('.single-blog-display-edit').querySelector('.edit-btn');
        const saveBtn = event.target.closest('.single-blog-display-edit').querySelector('.save-btn');
        const closeBtn = event.target.closest('.single-blog-display-edit').querySelector('.close-btn');
        if (editDropdown) {
            editDropdown.style.display = displayMode ? "block" : "none";
            if (deleteBtnEdit && editBtn && saveBtn && closeBtn) {
                deleteBtnEdit.style.display = displayMode ? "none" : "block";
                editBtn.style.display = displayMode ? "none" : "block";
                saveBtn.style.display = displayMode ? "block" : "none";
                closeBtn.style.display = displayMode ? "block" : "none";
                if (displayMode && closeBtn) {
                            closeBtn.addEventListener('click', closeEditDropdown);
                }
            }
        }
    }

    function getHeaders() {
        const accessToken = sessionStorage.getItem('accessToken');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };
    }

    function fetchUserBlogPosts() {
        const username = sessionStorage.getItem('username');
        fetch(`https://v2.api.noroff.dev/blog/posts/${username}`, {
            method: 'GET',
            headers: getHeaders()
        })
            .then(res => res.json())
            .then(data => {
                data.data.forEach(blogPost => {
                    const date = blogPost.created.slice(0, 10);
                    const blogPostElement = document.createElement('div');
                    blogPostElement.classList.add('single-blog-display-edit');
                    blogPostElement.dataset.id = blogPost.id;
                    blogPostElement.innerHTML = `
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
                    postsContainer.appendChild(blogPostElement);
                });

                // Attach event listeners to dynamically created elements
                const editButtons = document.querySelectorAll('.edit-btn');
                editButtons.forEach(editBtn => {
                    editBtn.addEventListener('click', displayEditDropdown);
                });

                const saveButtons = document.querySelectorAll('.save-btn');
                saveButtons.forEach(saveBtn => {
                    saveBtn.addEventListener('click', editSingleBlogPost);
                });
            })
            .catch(error => console.log(error));

    }

    function displayEditDropdown(event) {
        toggleEditDropdown(event, true);
    }

    function closeEditDropdown(event) {
        toggleEditDropdown(event, false);
    }

    fetchUserBlogPosts()

    // Update blog post
    function editSingleBlogPost(event) {
        const editForm = event.target.closest('.single-blog-display-edit').querySelector('.edit-form');
        const postIdElement = event.target.closest('.single-blog-display-edit');
        if (!editForm || !postIdElement) {
            console.error('Edit form or post ID element not found');
            return; // Exit the function if elements are not found
        }

        const postId = postIdElement.dataset.id; // Get postId.
        const heroImgUrlInput = editForm.querySelector('#img-url-hero');
        const heroImgAltInput = editForm.querySelector('#alt-img-hero');
        const newTitleInput = editForm.querySelector('#new-title');
        const tagsInput = editForm.querySelector('#tags');
        const firstParagraphInput = editForm.querySelector('#first-paragraph');
        const secondParagraphInput = editForm.querySelector('#second-paragraph');
        const thirdParagraphInput = editForm.querySelector('#third-paragraph');
        const imgUrl1Input = editForm.querySelector('#img-url-1');
        const altImg1Input = editForm.querySelector('#alt-img-1');
        const imgUrl2Input = editForm.querySelector('#img-url-2');
        const altImg2Input = editForm.querySelector('#alt-img-2');
        const imgUrl3Input = editForm.querySelector('#img-url-3');
        const altImg3Input = editForm.querySelector('#alt-img-3');

        // Ensure all required inputs are found before proceeding
        if (!heroImgUrlInput || !heroImgAltInput || !newTitleInput || !tagsInput || !firstParagraphInput || !imgUrl1Input || !altImg1Input || !secondParagraphInput || !imgUrl2Input || !altImg2Input || !thirdParagraphInput || !imgUrl3Input || !altImg3Input) {
            console.error('One or more input elements not found');
            return; // Exit the function if any input element is not found
        }

        //concatenate paragraphs into single body
        const body = {
            firstParagraph: firstParagraphInput.value,
            secondParagraph: secondParagraphInput.value,
            thirdParagraph: thirdParagraphInput.value
        };

        const media =  {
            heroImg: {
                url: heroImgUrlInput.value,
                alt: heroImgAltInput.value
            },
            imgUrl1: {
                url: imgUrl1Input.value,
                alt: altImg1Input.value
            },
            imgUrl2: {
                url: imgUrl2Input.value,
                alt: altImg2Input.value
            },
            imgUrl3: {
                url: imgUrl3Input.value,
                alt: altImg3Input.value
            }
        };

        // fetch current post data
        const username = sessionStorage.getItem('username');
        const accessToken = sessionStorage.getItem('accessToken');
        fetch(`https://v2.api.noroff.dev/blog/posts/${username}/${postId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        })
            .then(response => response.json())
            .then(existingPostData => {
                const updatedPostData = {
                    title: newTitleInput.value || existingPostData.title,
                    tags: tagsInput.value !== '' ? tagsInput.value.split(',') : existingPostData.tags,
                    body: body,
                    media: media
                }
                return fetch(`https://v2.api.noroff.dev/blog/posts/${username}/${postId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(updatedPostData)
                })
            })
            .then(response => {
                if (response.ok) {
                    //update successful
                    alert('Post updated successfully');
                } else {
                    // update NOT successful
                    alert('Error - Failed to update post')
                }
            })
            .catch(error => console.error('Error', error));
    }
});



