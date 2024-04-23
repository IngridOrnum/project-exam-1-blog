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
                    email: emailLogin, // Use hardcoded email
                    password: passwordLogin
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful, redirect or do something
                console.log('Login successful');
                window.location.href = '../post/edit.html'; // Redirect to dashboard page
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





// class login {
//     constructor(form, fields) {
//         this.form = form;
//         this.fields = fields;
//         this.validateOnSubmit();
//     }
//     validateOnSubmit() {
//         let self = this;
//
//         this.form.addEventListener("submit", (event) => {
//             event.preventDefault();
//             var error = 0;
//             self.fields.forEach((field) => {
//                 const input = document.querySelector(`#${field}`);
//                 if(self.validateFields(input) === false) {
//                     error++;
//                 }
//             });
//             if (error === 0) {
//                 console.log('success!')
//             }
//         });
//     }
//     validateFields(field) {
//         // makes sure each field isn't blanc
//         if(field.value.trim() === "") {
//             this.setStatus (
//                 field,
//                 `${field.previousElementSibling.innerText} Please add a username`,
//                 "error"
//             );
//             return false;
//         } else {
//             if (field.type === "password") {
//                 if(field.value.length < 8) {
//                     this.setStatus (
//                         field,
//                         `${field.previousElementSibling.innerText} The password must be 8 characters or more`,
//                         "error"
//                     );
//                     return false;
//                 } else {
//                     this.setStatus(field, null, "success");
//                     return true;
//                 }
//             } else {
//                 this.setStatus(field, null, "success");
//                 return true;
//             }
//         }
//     }
//     setStatus(field, message, status) {
//         const errorMessage = field.parentElement.querySelector("#login-error-message");
//         if (status === "error") {
//             errorMessage.innerText = message;
//             field.classList.add("input-error");
//         }
//     }
// }
//
// const form = document.querySelector(".login-form");
//
// if(form) {
//     const fields = ["username", "password"];
//     const validator = new login(form, fields);
// }