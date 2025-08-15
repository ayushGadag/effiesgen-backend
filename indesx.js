const express = require('express');
const app = express();
const PORT = 3000;

// Simple route that returns a manipulated string
app.get('/greet', (req, res) => {
    const name = req.query.name || 'Guest';
    const greeting = `Hello, ${name.toUpperCase()}! Welcome to EffiESGen.`;
    res.send(greeting);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
