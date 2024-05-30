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

            let dateString = postData.created;
            let date = new Date(dateString);
            let day = String(date.getDate()).padStart(2, '0');
            let month = String(date.getMonth() + 1).padStart(2, '0');
            let year = date.getFullYear();
            let formattedDate = `${day}.${month}.${year}`;

            document.title = 'Nordic Trekking ✵ ' + postData.title;

            const postDataDisplay =
                `
                <img class="hero-img-single-post" src="${postData.media.url}" alt="${postData.media.alt}">
                <div class="single-post-content-wrapper">
                    <div class="bg-title">
                        <h1>${postData.title}</h1>
                    </div>
                    <div class="auth-and-date">
                        <span>${postData.author.name}</span>
                        <span>•</span>
                        <span>${formattedDate}</span>
                    </div>
                    <div class="body-single-post">${postData.body}</div>
                </div>
                `;
            document.querySelector('.blog-post-container').insertAdjacentHTML('beforeend', postDataDisplay);
        })
        .catch(error => console.log(error));
}

document.addEventListener('DOMContentLoaded', displaySinglePost);


