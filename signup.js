// Signup form handling
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const message = document.getElementById('signup-message');

    try {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const result = await response.json();
        if (response.ok) {
            message.textContent = 'Registration successful! You can now log in.';
            message.style.color = 'green';
            document.getElementById('signupForm').reset();
        } else {
            message.textContent = result.message || 'Registration failed!';
            message.style.color = 'red';
        }
    } catch (error) {
        message.textContent = 'Error connecting to server!';
        message.style.color = 'red';
        console.error('Error:', error);
    }
});

// Login form handling
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const message = document.getElementById('login-message');

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();
        if (response.ok) {
            message.textContent = `Login successful! Welcome, ${result.user.username}`;
            message.style.color = 'green';
            document.getElementById('loginForm').reset();
        } else if (result.message === 'User not registered') {
            message.textContent = 'User not registered. Please sign up first.';
            message.style.color = 'orange';
            document.getElementById('loginForm').reset();
        } else {
            message.textContent = result.message || 'Login failed!';
            message.style.color = 'red';
        }
    } catch (error) {
        message.textContent = 'Error connecting to server!';
        message.style.color = 'red';
        console.error('Error:', error);
    }
});