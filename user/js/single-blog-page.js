function displaySinglePost () {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    console.log(postId);

    if (!postId) {
        console.error('No postId found');
        return;
    }

    fetch(`https://v2.api.noroff.dev/blog/posts/IngridOrnum/${postId}`)
        .then(response => response.json())
        .then(data => {
            const postDataDisplay =
                `
                <img class="hero-img-single-post" src="${data.data.media.url}" alt="${data.data.media.alt}">
                <div class="single-post-content-wrapper">
                <h1>${data.data.title}</h1>
                    <div class="body-single-post">${data.data.body}</div>
                </div>
                `;
            document.querySelector('.blog-post-container').insertAdjacentHTML('beforeend', postDataDisplay);
        })
        .catch(error => console.log(error));
}

document.addEventListener('DOMContentLoaded', displaySinglePost);


