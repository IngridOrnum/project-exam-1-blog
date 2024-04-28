document.addEventListener('DOMContentLoaded', function () {

    const createPostFormContainer = document.querySelector('#form-section-wrapping');

    const newBlogPostData = {

    }

    function createNewPost() {
        const username = sessionStorage.getItem('username');
        fetch(`https://v2.api.noroff.dev/blog/posts/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        }).then(response => response.json())
            .then(post => {
                populateForm(formElement, post);
            })
            .catch(error => console.error('Failed to fetch post for editing:', error));
    }
});