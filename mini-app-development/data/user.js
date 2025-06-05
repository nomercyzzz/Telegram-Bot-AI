document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:3000/api';
    const loginForm = document.querySelector('.container-login form');
    const registerForm = document.querySelector('.container-registration form');

    function redirectToApp() {
        window.location.href = '/chat-ai';

    }

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            login: registerForm.querySelector('#login').value,
            email: registerForm.querySelector('#email').value,
            password: registerForm.querySelector('#password').value
        };

        fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                registerForm.reset();
                redirectToApp();
            } else {
                alert(data.message || 'Ошибка при регистрации');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при регистрации');
        });
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            login: loginForm.querySelector('#login').value,
            password: loginForm.querySelector('#password').value
        };

        fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                loginForm.reset();
                redirectToApp();
            } else {
                alert(data.message || 'Неверный логин или пароль');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при входе');
        });
    });
});