
document.addEventListener('DOMContentLoaded', function () {
    const registerButton = document.getElementById('register-btn');
    const errorMessage = document.getElementById('register-error-message');

    registerButton.addEventListener('click', async function (event) {
        event.preventDefault(); // Prevent the default form submission

        const usernameRegister = document.getElementById('username').value;
        const emailRegister = document.getElementById('email-register').value;
        const passwordRegister = document.getElementById('password-register').value;

        // Validate username
        if (!/^[a-zA-Z_]+$/.test(usernameRegister)) {
            errorMessage.textContent = 'Username must only contain letters from a-z/A-Z and no other symbols apart from underscores ( _ ).';
            return;
        }

        // Validate password
        if (passwordRegister.length < 8) {
            errorMessage.textContent = 'Password must be at least 8 characters long.';
            return;
        }

        // Validate email
        if (!emailRegister.endsWith('@stud.noroff.no')) {
            errorMessage.textContent = 'Email must end with @stud.noroff.no';
            return;
        }

        // Make a POST request to the registration API endpoint
        try {
            const response = await fetch('https://v2.api.noroff.dev/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: usernameRegister,
                    email: emailRegister,
                    password: passwordRegister
                })
            });

            const data = await response.json();

            if (response.ok) {
                window.location.href = 'login.html'; // Redirect to dashboard page
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
