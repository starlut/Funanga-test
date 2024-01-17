// script.js

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    return password.length >= 4;
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value;

    const emailError = document.getElementById('emailError');

    if (!isValidEmail(emailValue)) {
        emailError.textContent = 'Invalid email address';
        emailInput.classList.add('is-invalid');
    } else {
        emailError.textContent = '';
        emailInput.classList.remove('is-invalid');
    }
}

function validatePassword() {
    const passwordInput = document.getElementById('password');
    const passwordValue = passwordInput.value;

    const passwordError = document.getElementById('passwordError');

    if (!isValidPassword(passwordValue)) {
        passwordError.textContent = 'Password must be at least 4 characters';
        passwordInput.classList.add('is-invalid');
    } else {
        passwordError.textContent = '';
        passwordInput.classList.remove('is-invalid');
    }
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('far', 'fa-eye');
        eyeIcon.classList.add('fas', 'fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fas', 'fa-eye-slash');
        eyeIcon.classList.add('far', 'fa-eye');
    }
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const rememberMe = rememberMeCheckbox.checked;
    console.log(rememberMe);

    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Reset previous error messages
    emailError.textContent = '';
    document.getElementById('email').classList.remove('is-invalid');
    passwordError.textContent = '';
    document.getElementById('password').classList.remove('is-invalid');

    // Validate email and password
    if (!isValidEmail(email)) {
        emailError.textContent = 'Invalid email address';
        document.getElementById('email').classList.add('is-invalid');
        return;
    }

    if (!isValidPassword(password)) {
        passwordError.textContent = 'Password must be at least 4 characters';
        document.getElementById('password').classList.add('is-invalid');
        return;
    }

    // Implement AJAX call to the login API endpoint here
    fetch('http://localhost/backend/index.php/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                // Store user info based on "Remember Me" checkbox
                if (rememberMe) {
                    localStorage.setItem('user_info', JSON.stringify(data.data));
                } else {
                    sessionStorage.setItem('user_info', JSON.stringify(data.data));
                }

                // Navigate to home page
                window.location.href = '../home/home.html';
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Add event listeners for input validation during user interaction
document.getElementById('email').addEventListener('input', validateEmail);
document.getElementById('password').addEventListener('input', validatePassword);
// Add event listener for the togglePassword button
document.getElementById('togglePassword').addEventListener('click', togglePassword);
