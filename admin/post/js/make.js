

    const formElement = document.querySelector('.edit-form');

    formElement.addEventListener('submit', event => {
        event.preventDefault(); //prevent the user to be redirected to another page when submitting form

        const formData = new FormData(formElement);
        const title = formData.get('title').trim();
        const body = formData.get('body-text').trim();
        const imgUrl = formData.get('img-url').trim();
        const altImg = formData.get('alt-img').trim();

        // Check if any of the required fields are empty
        if (!title || !body || !imgUrl || !altImg) {
            alert('Please fill in all inputs');
            return; // Stop the function if any required fields are empty
        }

        const jsonObject = {
            title: formData.get('title'),
            body: formData.get('body-text'),
            tags: formData.get('tags') ? formData.get('tags').split(',').map(tag => tag.trim()) : [], // Convert string to array
            media: {
                url: formData.get('img-url'),
                alt: formData.get('alt-img')
            }
        }

        const username = sessionStorage.getItem('username');
            fetch(`https://v2.api.noroff.dev/blog/posts/${username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(jsonObject)
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

    // Source: https://www.youtube.com/watch?v=fGYQJAlLD68&list=PLK5U0tyd34tBsRqm-ki81vtlioGv9j7Ky&index=5
