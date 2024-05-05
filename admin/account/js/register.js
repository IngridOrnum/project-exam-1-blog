
document.addEventListener('DOMContentLoaded', function () {
    const registerButton = document.getElementById('register-btn');
    const errorMessage = document.getElementById('register-error-message');

    registerButton.addEventListener('click', async function (event) {
        event.preventDefault(); // Prevent the default form submission

        const usernameRegister = document.getElementById('username').value;
        const emailRegister = document.getElementById('email-register').value;
        const passwordRegister = document.getElementById('password-register').value;

        if (!usernameRegister || !emailRegister || !passwordRegister) {
            errorMessage.textContent = 'please finn in all required fields';
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
