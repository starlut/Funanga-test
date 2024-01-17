document.addEventListener('DOMContentLoaded', function () {
    // Retrieve user info from session storage or local storage
    const userInfo = JSON.parse(sessionStorage.getItem('user_info')) || JSON.parse(localStorage.getItem('user_info'));

    if (userInfo) {
        // Display user information in the table
        displayUserInfo(userInfo);

        // Logout button click event
        const logoutButton = document.getElementById('logoutButton');
        logoutButton.addEventListener('click', function () {
            // Clear user info from both local storage and session storage
            localStorage.removeItem('user_info');
            sessionStorage.removeItem('user_info');

            // Redirect to the login page after logout
            window.location.href = '../login/login.html';
        });
    } else {
        // User info not found, handle accordingly (e.g., redirect to login page)
        console.error('User info not found');
        // Example: Redirecting to login page
        window.location.href = '../login/login.html';
    }
});

function displayUserInfo(userInfo) {
    // Get the table body
    const tableBody = document.querySelector('#userInfoTable tbody');

    // Create a new row for the user
    const userRow = document.createElement('tr');

    // Add user information to the row
    userRow.innerHTML = `
        <td>${userInfo.id}</td>
        <td>${userInfo.name}</td>
        <td>${userInfo.email}</td>
        <td>${userInfo.password}</td>
    `;

    // Append the row to the table body
    tableBody.appendChild(userRow);
}
