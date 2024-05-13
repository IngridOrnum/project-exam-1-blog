document.addEventListener('DOMContentLoaded', function () {

    const formElement = document.querySelector('.edit-form');

    formElement.addEventListener('submit', event => {
        event.preventDefault(); //prevent the user to be redirected to another page when submitting form

        const formData = new FormData(formElement);
        const title = document.getElementById('title').value.trim();
        const tags = document.getElementById('tags').value.trim().split(',').map(tag => tag.trim());

        const heroImgUrl = document.getElementById('img-url-1').value.trim();
        const heroAltImg = document.getElementById('alt-img-1').value.trim();

        // Check if any of the required fields are empty
        if (!title || !heroImgUrl|| !heroAltImg) {
            alert('Please fill in all inputs');
            return; // Stop the function if any required fields are empty
        }

        let body = `
            <p>${document.getElementById('paragraph-1').value.trim()}</p>
            <img src="${document.getElementById('img-url-2').value.trim()}" alt="${document.getElementById('alt-img-2').value.trim()}">
            <p>${document.getElementById('paragraph-2').value.trim()}</p>
            <img src="${document.getElementById('img-url-3').value.trim()}" alt="${document.getElementById('alt-img-3').value.trim()}">
            <p>${document.getElementById('paragraph-3').value.trim()}</p>
        `;

        const postData = {
            title: title,
            tags: tags,
            body: body,
            media: {
                url: heroImgUrl,
                alt: heroAltImg
            }
        }

        const username = sessionStorage.getItem('username');
        fetch(`https://v2.api.noroff.dev/blog/posts/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(postData)
        })
            .then(response => {
                if (response.ok) {
                    alert('New Post Created Successfully');
                } else {
                    response.json().then(data => alert('Error - ' + data.message));
                }
            })
            .catch(error => console.error('Error creating post:', error));
    });

})


    // Source: https://www.youtube.com/watch?v=fGYQJAlLD68&list=PLK5U0tyd34tBsRqm-ki81vtlioGv9j7Ky&index=5
