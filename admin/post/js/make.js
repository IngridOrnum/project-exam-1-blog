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

        const details = document.getElementById('paragraph-3').value.trim().split('\n').map(line => {
            const firstSpaceIndex = line.indexOf(' ');
            const firstWord = line.substring(0, firstSpaceIndex);
            const restOfLine = line.substring(firstSpaceIndex);
            return `<li><strong>${firstWord}</strong>${restOfLine}</li>`;
        }).join('');

        let body = `
            <p>${document.getElementById('paragraph-1').value.trim()}</p>
            <img class="img-2" src="${document.getElementById('img-url-2').value.trim()}" alt="${document.getElementById('alt-img-2').value.trim()}">
            <p>${document.getElementById('paragraph-2').value.trim()}</p>
            <div class="details-section-wrapper">
            <img class="details-img" src="${document.getElementById('img-url-3').value.trim()}" alt="${document.getElementById('alt-img-3').value.trim()}">
            <div class="details-wrapper">
                <h2>Details</h2>
                <ul>${details}</ul>
            </div>
            </div>
            
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
