
document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('login-btn');
    const errorMessage = document.getElementById('login-error-message');

    loginButton.addEventListener('click', async function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Hardcoded email and password values
        const emailLogin = document.getElementById('email-login').value;
        const passwordLogin = document.getElementById('password-login').value;

        // Make a POST request to the login API endpoint
        try {
            const response = await fetch('https://v2.api.noroff.dev/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailLogin,
                    password: passwordLogin
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful, save user data to session storage
                const accessToken = data.data.accessToken;
                const username = data.data.name;
                sessionStorage.setItem('accessToken', accessToken);
                sessionStorage.setItem('username', username);
                window.location.href = '../post/index.html'; // Redirect to dashboard page
            } else {
                // Login failed, display error message
                errorMessage.textContent = data.message;
            }
        } catch (error) {
            console.error('Error:', error);
            errorMessage.textContent = 'An error occurred while processing your request';
        }
    });
});
