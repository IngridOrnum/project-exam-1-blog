let allPosts = [];

function displayAllPosts() {
    fetch(`https://v2.api.noroff.dev/blog/posts/IngridOrnum`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data && data.data) {
                allPosts = data.data;  // Store fetched posts
                renderPosts(allPosts); // Call render function
            }
        })
        .catch(error => console.error('Error fetching blog posts:', error));
}

function renderPosts(posts) {
    document.querySelector('.blog-archive-section').innerHTML = posts.map((post, index) => {
        return `
            <div class="post-elements grid-item" data-tags="${post.tags.join(', ')}" id="post-grid-element-${index + 1}">
                 <a href="index.html?postId=${post.id}">
                <img class="post-img-grid" src="${post.media.url}" alt="${post.media.alt}">
                <div class="post-title-grid">${post.title}</div>
                </a>
            </div>`;
    }).join('');
}

displayAllPosts();

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.id === 'view-all') {
                renderPosts(allPosts);
            } else {
                const filterValue = button.getAttribute('data-filter');
                filterPosts(filterValue);
            }
        });
    });
});

function filterPosts(filter) {
    const filteredPosts = allPosts.filter(post => {
        return post.tags && post.tags.some(tag => tag && tag.toLowerCase() === filter.toLowerCase());
    });
    renderPosts(filteredPosts);
}
