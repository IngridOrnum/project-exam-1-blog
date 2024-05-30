document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('login-btn');
    const emptyFieldsErrorMessage = document.getElementById('empty-login-error-message');
    const falseInputErrorMessage = document.getElementById('false-input-login-error-message');

    loginButton.addEventListener('click', async function (event) {
        event.preventDefault();

        const emailLogin = document.getElementById('email-login').value;
        const passwordLogin = document.getElementById('password-login').value;

        emptyFieldsErrorMessage.style.display = 'none';
        falseInputErrorMessage.style.display = 'none';

        if (emailLogin === '' || passwordLogin === '') {
            emptyFieldsErrorMessage.style.display = 'block';
            return;
        }

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
                const accessToken = data.data.accessToken;
                const username = data.data.name;
                sessionStorage.setItem('accessToken', accessToken);
                sessionStorage.setItem('username', username);
                window.location.href = '../post/index.html';
            } else {
                falseInputErrorMessage.textContent = data.message || 'Invalid email or password';
                falseInputErrorMessage.style.display = 'block';
            }
        } catch (error) {
            falseInputErrorMessage.textContent = 'An error occurred while processing your request';
            falseInputErrorMessage.style.display = 'block';
        }
    });
});