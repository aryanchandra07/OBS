const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt'); // For password hashing

const app = express();
const port = 3000;

// Replace with your actual MongoDB connection string
const url = 'mongodb://localhost:27017/';
const dbName = 'bankingsystem';
const collectionName = 'users'; // Collection for storing user data

// Connect to MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, client) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }

    console.log('Connected to MongoDB successfully!');

    const db = client.db(dbName);
    const usersCollection = db.collection(collectionName);

    // User registration route (POST)
    app.post('/register', bodyParser.json(), async (req, res) => {
        try {
            const { username, password } = req.body;

            // Check for existing user
            const existingUser = await usersCollection.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: 'Username already exists' });
            }

            // Hash password securely
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new user into database
            await usersCollection.insertOne({ username, password: hashedPassword });

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'Registration failed' });
        }
    });

    // User login route (POST)
    app.post('/login', bodyParser.json(), async (req, res) => {
        try {
            const { username, password } = req.body;

            // Find user by username
            const user = await usersCollection.findOne({ username });
            if (!user) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            // Compare hashed passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            // Login successful (replace with your login logic, e.g., session management)
            res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ error: 'Login failed' });
        }
    });

    // Start the server
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});

/*
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

const app = express();
const port = 7700;

app.use(bodyParser.json());

// MongoDB connection URL
const url = 'mongodb://localhost:27017/';
const dbName = 'bankingsystem'; // Database name
const collectionName = 'users'; // Collection name

// Connect to MongoDB
MongoClient.connect(url, (err, client) => {

    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }

    console.log('Connected to MongoDB successfully');

    const db = client.db(dbName);
    const users = db.collection(collectionName);

    // Route to handle user registration
    app.post('/register', async (req, res) => {
        const { username, password } = req.body;

        try {
            // Check if username already exists
            const existingUser = await users.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'Username already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new user into the database
            await users.insertOne({ username, password: hashedPassword });
            res.status(201).json({ success: true, message: 'User registered successfully' });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ success: false, message: 'Error registering user' });
        }
    });

    // Route to handle user login
    app.post('/login', async (req, res) => {
        const { username, password } = req.body;

        try {
            // Find user in the database
            const user = await users.findOne({ username });
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            // Compare passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Incorrect password' });
            }

            // Login successful
            res.status(200).json({ success: true, message: 'Login successful' });
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ success: false, message: 'Error logging in' });
        }
    });

    // Start the server
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});

*/
