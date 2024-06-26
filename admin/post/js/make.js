document.addEventListener('DOMContentLoaded', function () {

    const formElement = document.querySelector('.edit-form');

    formElement.addEventListener('submit', event => {
        event.preventDefault();

        const title = document.getElementById('title').value.trim();
        const heroImgUrl = document.getElementById('img-url-1').value.trim();
        const heroAltImg = document.getElementById('alt-img-1').value.trim();
        const region = document.getElementById('region').value.trim();
        const difficulty = document.getElementById('difficulty').value.trim();
        const season = document.getElementById('season').value.trim();
        const activity = document.getElementById('activity').value.trim();

        const tags = [region, difficulty, season, activity].filter(tag => tag);

        if (!title || !heroImgUrl || !heroAltImg) {
            alert('Please fill in all inputs');
            return;
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
