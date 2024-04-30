const username = sessionStorage.getItem('username');

function fetchUserBlogPosts() {
    fetch(`https://v2.api.noroff.dev/blog/posts/IngridOrnum`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data && data.data) {
                // Ensure we take only the first three posts
                const threeLatestPosts = data.data.slice(0, 3);
                // Create HTML string
                let postSlides = threeLatestPosts.map((post, index) => {
                    return `
                <li class="slide-${index + 1}">
                    <div>${post.title}</div>
                    <img src="${post.media.url}" alt="${post.media.alt}">
                </li>`;
                }).join('');  // Join the array of strings into a single string

                // Insert HTML string into the DOM
                document.querySelector('.carousel-ul-container').innerHTML = postSlides;
            }
        })
        .catch(error => console.error('Error fetching blog posts:', error));
}

fetchUserBlogPosts();

