
const welcomeTitle = document.getElementById('welcome-title');
const username = sessionStorage.getItem('username');

function displayNameWelcome() {
    fetch(`https://v2.api.noroff.dev/blog/posts/${username}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const username = sessionStorage.getItem('username');
            welcomeTitle.innerHTML = `
    <h1 class="h1-admin">Welcome, ${username}!</h1>
    `
        })
        .catch(error => console.log(error));
        }

displayNameWelcome()

