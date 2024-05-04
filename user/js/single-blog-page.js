function displaySinglePost () {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId'); // This should match the name in the URL

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
                <img src="${data.data.media.url}" alt="${data.data.media.alt}">
                <h1>${data.data.title}</h1>
                <p>${data.data.body}</p>
                `;
            document.querySelector('.blog-post-container').insertAdjacentHTML('beforeend', postDataDisplay);
        })
        .catch(error => console.log(error));
}

document.addEventListener('DOMContentLoaded', displaySinglePost);
