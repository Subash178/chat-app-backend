const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy users data (replace with database later)
const users = [
  { username: 'john', email: 'john@example.com', password: 'password123' },
  { username: 'jane', email: 'jane@example.com', password: 'password456' },
];

// Signup route
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  users.push({ username, email, password });
  res.json({ success: true, message: 'User created' });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true, user });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

// Search users route
app.get('/search', (req, res) => {
  const { username } = req.query;
  const foundUsers = users.filter((u) => u.username.includes(username));
  res.json(foundUsers);
});

// Server start
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
