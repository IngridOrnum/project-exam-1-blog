document.addEventListener('DOMContentLoaded', function () {

    const createPostForm = document.getElementById('create-post-form');

    createPostForm.addEventListener('submit', handleFormSubmit);

    async function handleFormSubmit(event) {
            event.preventDefault(); //prevent the user to be redirected to another page when submitting form
        const form = event.currentTarget;

    }

    //     const username = sessionStorage.getItem('username');
    //     fetch(`https://v2.api.noroff.dev/blog/posts/${username}`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify()
    //     }).then(response => response.json())
    //         .then(post => {
    //
    //         })
    //         .catch(error => console.error('Failed to fetch post for editing:', error));
    // }

//         function (event) {
//         event.preventDefault(); //prevent the user to be redirected to another page when submitting form
//
//         const payload = new FormData(createPostForm);
//         console.log([...payload]);
//

});