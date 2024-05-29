document.addEventListener('DOMContentLoaded', function () {
    const postsContainer = document.querySelector('.ul-all-posts-edit-page');
    const username = sessionStorage.getItem('username');
    const headers = getHeaders();
    let blogPosts = [];

    fetchUserBlogPosts();

    const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter')
                if (button.id === 'view-all-edit-page') {
                    renderPosts(blogPosts);
                } else {
                    filterPosts(filterValue, blogPosts);
                }
            });
        });
    function fetchUserBlogPosts() {
        fetch(`https://v2.api.noroff.dev/blog/posts/${username}`, {
            method: 'GET',
            headers
        })
            .then(res => res.json())
            .then(data => {
                blogPosts = data.data;
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

        const bodyText = new DOMParser().parseFromString(blogPost.body, 'text/html');
        const paragraphs = bodyText.querySelectorAll('p');
        const images = bodyText.querySelectorAll('img');
        const details = bodyText.querySelector('ul');
        let detailsText = '';

        if (details) {
            detailsText = Array.from(details.querySelectorAll('li')).map(li => li.textContent).join('\n');
        }

        element.innerHTML = `
            <li>${blogPost.title}</li>
            <div class="author-date-edit-page">
                <li><strong>Author:</strong> ${blogPost.author.name}</li>
                <li><strong>Date:</strong> ${date}</li>
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
                    <label for="img-url-1">Img URL Hero:</label>
                     <input id="img-url-1" type="text">
                     <label for="alt-img-1">Image description:</label>
                     <input id="alt-img-1" type="text">
                     <label for="title">Title:</label>
                     <input id="title" type="text">
                     <div>
                    <span>Tags</span>
                    <label for="region">Region</label>
                    <select name="region" id="region">
                        <option value="">Select option</option>
                        <option value="oslo">Oslo</option>
                        <option value="buskerud">Buskerud</option>
                        <option value="jotunheimen">Jotunheimen</option>
                        <option value="rondane">Rondane</option>
                        <option value="hardanger">Hardanger</option>
                        <option value="more-romsdal">Møre & Romsdal</option>
                    </select>
                    <label for="difficulty">Difficulty</label>
                    <select name="difficulty" id="difficulty">
                        <option value="">Select option</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="difficult">Difficult</option>
                    </select>
                    <label for="activity">Activity</label>
                    <select name="activity" id="activity">
                        <option value="">Select option</option>
                        <option value="forest">Forest Hiking</option>
                        <option value="mountain">Mountain Hiking</option>
                        <option value="difficult">Biking</option>
                        <option value="climbing">Climbing</option>
                         <option value="skiing">Skiing</option>
                    </select>
                    <label for="season">Season</label>
                    <select name="season" id="season">
                       <option value="">Select option</option>
                        <option value="ssa">Spring, Summer & Autumn</option>
                        <option value="winter">Winter</option>
                    </select>
                </div>
                     <label for="paragraph-1">First paragraph:</label>
                     <textarea id="paragraph-1"  cols="100" rows="20"></textarea>
                      <label for="img-url-2">Img URL:</label>
                     <input id="img-url-2" type="text">
                     <label for="alt-img-2">Image description:</label>
                     <input id="alt-img-2" type="text">
                     <label for="paragraph-2">Second paragraph:</label>
                     <textarea id="paragraph-2"  cols="100" rows="20"></textarea>
                      <label for="img-url-3">Img URL:</label>
                     <input id="img-url-3" type="text">
                     <label for="alt-img-3">Image description:</label>
                     <input id="alt-img-3" type="text">
                     <label for="paragraph-3">Details:</label>
                     <textarea id="paragraph-3"  cols="100" rows="8"></textarea>
                 </form>
            </div>
        `;
        attachButtonListeners(element);
        return element;
    }

    function renderPosts(posts) {
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            postsContainer.appendChild(createBlogPostElement(post));
        })
    }

    function filterPosts(filter, posts) {
        const filteredPosts = posts.filter(post => {
            return post.tags && post.tags.some(tag => tag.toLowerCase() === filter.toLowerCase())
        });
        renderPosts(filteredPosts);
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
        fetch(`https://v2.api.noroff.dev/blog/posts/${username}/${postId}`, {
            method: 'GET',
            headers
        })
            .then(response => response.json())
            .then(post => addFormData(editDropdown, post))
            .catch(error => console.error('Failed to fetch post for editing:', error));
    }

    function addFormData(editDropdown, postData) {
        const { title, tags, body, media } = postData.data;
        editDropdown.querySelector('#title').value = title || '';
        editDropdown.querySelector('#img-url-1').value = media.url || '';
        editDropdown.querySelector('#alt-img-1').value = media.alt || '';

        // Set the tags in the select elements
        const tagMap = {
            'region': ['oslo', 'buskerud', 'jotunheimen', 'rondane', 'hardanger', 'more-romsdal'],
            'difficulty': ['easy', 'medium', 'difficult'],
            'season': ['ssa', 'winter'],
            'activity': ['forest', 'mountain', 'biking', 'climbing'],
            'travel-duration': ['day-trip', 'weekend', 'vacation']
        };

        Object.keys(tagMap).forEach(tagKey => {
            const selectElement = editDropdown.querySelector(`#${tagKey}`);
            const tagValue = tags.find(tag => tagMap[tagKey].includes(tag));
            if (tagValue) {
                selectElement.value = tagValue;
            }
        });

        const parser = new DOMParser();
        const bodyText = parser.parseFromString(body, 'text/html');

        const paragraphs = bodyText.querySelectorAll('p');
        const images = bodyText.querySelectorAll('img');
        const details = bodyText.querySelector('ul');

        if (paragraphs.length >= 2 && images.length >= 2) {
            editDropdown.querySelector('#paragraph-1').value = paragraphs[0].textContent;
            editDropdown.querySelector('#img-url-2').value = images[0].src;
            editDropdown.querySelector('#alt-img-2').value = images[0].alt;
            editDropdown.querySelector('#paragraph-2').value = paragraphs[1].textContent;
            editDropdown.querySelector('#img-url-3').value = images[1].src;
            editDropdown.querySelector('#alt-img-3').value = images[1].alt;

            if (details) {
                const detailsText = Array.from(details.querySelectorAll('li')).map(li => {
                    const line = li.innerHTML.replace(/<strong>(.*?)<\/strong>/, '$1');
                    return line;
                }).join('\n');
                editDropdown.querySelector('#paragraph-3').value = detailsText;
            }
        }
    }

    function editSingleBlogPost(event) {
        event.preventDefault();

        const postId = event.target.closest('.single-blog-display-edit').dataset.id;
        const form = event.target.closest('.single-blog-display-edit').querySelector('.edit-form');

        const title = form.querySelector('#title').value.trim();
        const heroImageUrl = form.querySelector('#img-url-1').value.trim();
        const heroImageAlt = form.querySelector('#alt-img-1').value.trim();

        // Collect selected tags from dropdowns
        const region = form.querySelector('#region').value.trim();
        const difficulty = form.querySelector('#difficulty').value.trim();
        const season = form.querySelector('#season').value.trim();
        const activity = form.querySelector('#activity').value.trim();

        const tags = [region, difficulty, season, activity].filter(tag => tag);

        const details = form.querySelector('#paragraph-3').value.trim().split('\n').map(line => {
            const firstSpaceIndex = line.indexOf(' ');
            const firstWord = line.substring(0, firstSpaceIndex);
            const restOfLine = line.substring(firstSpaceIndex);
            return `<li><strong>${firstWord}</strong>${restOfLine}</li>`;
        }).join('');
        let body = `
    <p>${form.querySelector('#paragraph-1').value.trim()}</p>
    <img class="img-2" src="${form.querySelector('#img-url-2').value.trim()}" alt="${form.querySelector('#alt-img-2').value.trim()}">
    <p>${form.querySelector('#paragraph-2').value.trim()}</p>
    <div class="details-section-wrapper">
    <img class="details-img" src="${form.querySelector('#img-url-3').value.trim()}" alt="${form.querySelector('#alt-img-3').value.trim()}">
    <div class="details-wrapper">
        <h2>Details</h2>
        <ul>${details}</ul>
    </div>
    </div>
`;


        // Create updated post data object
        const updatedPostData = {
            title: title,
            tags: tags,
            body: body,
            media: {
                url: heroImageUrl,
                alt: heroImageAlt
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
        const postElement = element.target.closest('.single-blog-display-edit');
        const postId = postElement.dataset.id;
        fetch(`https://v2.api.noroff.dev/blog/posts/${username}/${postId}`, {
            method: 'DELETE',
            headers
        })
            .then(response => {
                if (response.ok) {
                    alert('Post deleted successfully');
                    postElement.remove();
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