document.addEventListener('DOMContentLoaded', function () {
    const registerButton = document.getElementById('register-btn');
    const errorMessage = document.getElementById('register-error-message');

    registerButton.addEventListener('click', async function (event) {
        event.preventDefault();

        const usernameRegister = document.getElementById('username').value;
        const emailRegister = document.getElementById('email-register').value;
        const passwordRegister = document.getElementById('password-register').value;

        errorMessage.style.display = 'none';

        if (usernameRegister === '' || emailRegister === '' || passwordRegister === '') {
            errorMessage.textContent = 'All fields are required.';
            errorMessage.style.display = 'block';
            return;
        }

        if (!/^[a-zA-Z_]+$/.test(usernameRegister)) {
            errorMessage.textContent = 'Username must only contain letters from a-z/A-Z and no other symbols apart from underscores ( _ ).';
            errorMessage.style.display = 'block';
            return;
        }

        if (passwordRegister.length < 8) {
            errorMessage.textContent = 'Password must be at least 8 characters long.';
            errorMessage.style.display = 'block';
            return;
        }

        if (!emailRegister.endsWith('@stud.noroff.no')) {
            errorMessage.textContent = 'Email must end with @stud.noroff.no';
            errorMessage.style.display = 'block';
            return;
        }

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
                window.location.href = 'login.html';
            } else {
                errorMessage.textContent = data.message;
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            errorMessage.textContent = 'An error occurred while processing your request';
            errorMessage.style.display = 'block';
        }
    });
});
