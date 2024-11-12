const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Dummy users database (Replace with real database in production)
const users = [
    { username: 'admin', password: 'password123' }, // Replace with encrypted passwords!
];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Static files (HTML, CSS, JS)

// Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the username and password match
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Successful login, redirect to post creation page
        res.redirect('/create-post');
    } else {
        // Failed login, send error
        res.send('Invalid username or password');
    }
});

// Route for creating a post (Accessible only for logged-in users)
app.get('/create-post', (req, res) => {
    res.send('<h1>Post Creation Page</h1><form action="/create-post" method="POST"><textarea name="post" placeholder="Write your post here"></textarea><button type="submit">Submit Post</button></form>');
});

// Handle post creation
app.post('/create-post', (req, res) => {
    const newPost = req.body.post;
    // Save newPost to your database (e.g., MongoDB, MySQL)
    res.send('Post submitted!');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
