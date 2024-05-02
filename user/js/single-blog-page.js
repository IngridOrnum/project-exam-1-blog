
function displaySinglePost () {
    fetch('https://v2.api.noroff.dev/blog/posts/IngridOrnum/bdaaf12a-be56-4ad7-a4b8-5f03bf0f00d3')
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const postDataDisplay =
                `
                <img src="${data.data.media.url}" alt="${data.data.media.alt}">
                <h1>${data.data.title}</h1>
                <p>${data.data.body}</p>
                `
            document.querySelector('.blog-post-container').insertAdjacentHTML('beforeend', postDataDisplay);

        })
        .catch(error => console.log(error));
}

displaySinglePost()







