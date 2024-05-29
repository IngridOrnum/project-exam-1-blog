
document.addEventListener('DOMContentLoaded', function () {
    const postsContainer = document.querySelector('.ul-all-posts-edit-page');
    const username = sessionStorage.getItem('username');
    const headers = getHeaders();
    let blogPosts = [];

    fetchUserBlogPosts();

    const filterButtons = document.querySelectorAll('.filter-btn');
    const mainFilterButtons = document.querySelectorAll('.main-filter-btn');
    const viewAllButton = document.getElementById('view-all');
    const lineDivider = document.querySelector('.line-divider');

    viewAllButton.classList.add('active');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            if (button.id === 'view-all') {
                resetPostView();
                renderPosts(blogPosts);
            } else {
                filterPosts(filterValue);
            }
            removeActiveClass(filterButtons);
            button.classList.add('active');
        });
    });

    mainFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            removeActiveClass(mainFilterButtons);
            hideAllSubcategories();
            const subcategoryClass = button.id.replace('-filter-btn', '-subcategories');
            const subcategories = document.querySelector(`.${subcategoryClass}`);
            if (subcategories) {
                subcategories.style.display = 'block';
                lineDivider.style.display = 'block';
            }
            button.classList.add('active');
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
                renderPosts(blogPosts);
            })
            .catch(error => console.error('Error fetching blog posts:', error));
    }

    function renderPosts(posts) {
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            postsContainer.appendChild(createBlogPostElement(post));
        });
    }

    function createBlogPostElement(blogPost) {
        const date = blogPost.created.slice(0, 10);
        const element = document.createElement('li');
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
            <div class="wrapper-edit-card">
                <div class="title-card-edit-page">${blogPost.title}</div>
                <div class="line-divider-card-edit-page"></div>
                <div class="author-date-edit-page">
                    <span><strong>Author:</strong> ${blogPost.author.name}</span>
                    <span><strong>Date:</strong> ${date}</span>
                </div>
                <div class="edit-delete-btns">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                    <button class="save-btn">Save</button>
                    <button class="close-btn">Close</button>
                </div>
                <div class="edit-dropdown" style="display: none;">
                    <div class="line-divider-card-edit-page"></div>
                    <section id="create-post-form-section-wrapping">
                        <form class="edit-form">
                            <label for="img-url-1">Img URL Hero:</label>
                            <input id="img-url-1" type="text">
                            <label for="alt-img-1">Image description:</label>
                            <input id="alt-img-1" type="text">
                            <label for="title">Title:</label>
                            <input id="title" type="text">
                            <div class="tags-wrapper">
                                <span class="tags">Tags:</span>
                                <div class="select-wrapper">
                                    <div class="label-select-wrapper">
                                        <label for="region">Region</label>
                                        <select id="region" name="region">
                                            <option value="">Select option</option>
                                            <option value="oslo">Oslo</option>
                                            <option value="buskerud">Buskerud</option>
                                            <option value="jotunheimen">Jotunheimen</option>
                                            <option value="rondane">Rondane</option>
                                            <option value="hardanger">Hardanger</option>
                                            <option value="nordland">Nordland</option>
                                            <option value="more-romsdal">Møre & Romsdal</option>
                                        </select>
                                    </div>
                                    <div class="label-select-wrapper">
                                        <label for="difficulty">Difficulty</label>
                                        <select id="difficulty" name="difficulty">
                                            <option value="">Select option</option>
                                            <option value="easy">Easy</option>
                                            <option value="medium">Medium</option>
                                            <option value="difficult">Difficult</option>
                                        </select>
                                    </div>
                                    <div class="label-select-wrapper">
                                        <label for="season">Season</label>
                                        <select id="season" name="season">
                                            <option value="">Select option</option>
                                            <option value="ssa">Spring, Summer & Autumn</option>
                                            <option value="winter">Winter</option>
                                        </select>
                                    </div>
                                    <div class="label-select-wrapper">
                                        <label for="activity">Activity</label>
                                        <select id="activity" name="activity">
                                            <option value="">Select option</option>
                                            <option value="forest">Forest Hiking</option>
                                            <option value="mountain">Mountain Hiking</option>
                                            <option value="biking">Biking</option>
                                            <option value="skiing">Skiing</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <label for="paragraph-1">First paragraph:</label>
                            <textarea cols="100" id="paragraph-1" rows="20"></textarea>
                            <label for="img-url-2">Img URL:</label>
                            <input id="img-url-2" type="text">
                            <label for="alt-img-2">Image description:</label>
                            <input id="alt-img-2" type="text">
                            <label for="paragraph-2">Second paragraph:</label>
                            <textarea cols="100" id="paragraph-2" rows="20"></textarea>
                            <label for="img-url-3">Img URL:</label>
                            <input id="img-url-3" type="text">
                            <label for="alt-img-3">Image description:</label>
                            <input id="alt-img-3" type="text">
                            <label for="paragraph-3">Details:</label>
                            <textarea cols="100" id="paragraph-3" rows="8">
                            </textarea>
                        </form>
                    </section>
                </div>
            </div>
        `;
        attachButtonListeners(element);
        return element;
    }

    function filterPosts(filter) {
        const filteredPosts = blogPosts.filter(post => {
            return post.tags && post.tags.some(tag => typeof tag === 'string' && tag === filter);
        });
        resetPostView();
        renderPosts(filteredPosts);
    }

    function resetPostView() {
        postsContainer.innerHTML = '';
    }

    function removeActiveClass(buttons) {
        buttons.forEach(btn => btn.classList.remove('active'));
    }

    function hideAllSubcategories() {
        const allSubcategories = document.querySelectorAll('.wrapper-subcategories');
        allSubcategories.forEach(subcat => {
            subcat.style.display = 'none';
        });
        lineDivider.style.display = 'none';
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

        const tagMap = {
            'region': ['oslo', 'buskerud', 'jotunheimen', 'rondane', 'hardanger', 'more-romsdal'],
            'difficulty': ['easy', 'medium', 'difficult'],
            'season': ['ssa', 'winter'],
            'activity': ['forest', 'mountain', 'biking', 'climbing']
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
});