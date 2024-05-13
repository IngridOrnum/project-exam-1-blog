function displaySinglePost () {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    if (!postId) {
        console.error('No postId found');
        return;
    }

    fetch(`https://v2.api.noroff.dev/blog/posts/IngridOrnum/${postId}`)
        .then(response => response.json())
        .then(data => {
            const postData = data.data;

            console.log("Body HTML:", postData.body);

            const postDataDisplay =
                `
                <img class="hero-img-single-post" src="${postData.media.url}" alt="${postData.media.alt}">
                <div class="single-post-content-wrapper">
                <h1>${postData.title}</h1>
                    <div class="body-single-post">${postData.body}</div>
                </div>
                `;
            document.querySelector('.blog-post-container').insertAdjacentHTML('beforeend', postDataDisplay);
        })
        .catch(error => console.log(error));

}

document.addEventListener('DOMContentLoaded', displaySinglePost);


