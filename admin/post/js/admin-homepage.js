
const welcomeTitle = document.getElementById('welcome-title');
const username = sessionStorage.getItem('username');

function displayNameWelcome() {
    fetch(`https://v2.api.noroff.dev/blog/posts/${username}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const userDisplayName = data.data[0].author.name;
            welcomeTitle.innerHTML = `
    <h1>Welcome, ${userDisplayName}!</h1>
    `
        })
        .catch(error => console.log(error));
        }

displayNameWelcome()

