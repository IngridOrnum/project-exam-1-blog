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
                document.querySelector('.blog-archive-section').innerHTML = data.data.map((post, index) => {
                    return `
                <div class="post-elements grid-item" id="post-grid-element-${index + 1}">
                    <a href="post/index.html?postId=${post.id}">
                    <img class="post-img-grid" src="${post.media.url}" alt="${post.media.alt}">
                    <div class="post-title-grid">${post.title}</div>
                    </a>
                </div>`;
                }).join('');  // Join the array of strings into a single string
            }
        })
        .catch(error => console.error('Error fetching blog posts:', error));
}

displayAllPosts();