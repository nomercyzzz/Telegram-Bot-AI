document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:3000/api';
    const loginForm = document.querySelector('.container-login form');
    const registerForm = document.querySelector('.container-registration form');

    // Регистрация
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
                alert('Регистрация успешна!');
                registerForm.reset();
            } else {
                alert(data.message || 'Ошибка при регистрации');
            }
        })
    });

    // Вход
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
                alert('Вход выполнен успешно!');
                loginForm.reset();
            } else {
                alert(data.message || 'Неверный логин или пароль');
            }
        })
    });
});