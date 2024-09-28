function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5500/login', { // Updated port to 5500
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            const messageDiv = document.getElementById('message');
            messageDiv.textContent = data.message; // Display login message

            if (data.success) {
                // Redirect or perform other actions for successful login
            } else {
                // Handle login failure
            }
        })
        .catch(error => console.error('Error:', error));
}
