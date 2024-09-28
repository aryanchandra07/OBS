const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoURI = 'mongodb://localhost:27017'; // Replace with your MongoDB connection URI
const dbName = 'bankingsystem';

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    let client; // Declare the client variable here

    try {
        client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const db = client.db(dbName);
        const usersCollection = db.collection('users');

        const existingUser = await usersCollection.findOne({ username });

        if (existingUser) {
            return res.status(400).send('User already registered');
        }

        await usersCollection.insertOne({ username, password });

        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        if (client) {
            client.close();
        }
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


// const express = require('express');
// const { MongoClient } = require('mongodb');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 5500;

// app.use(bodyParser.urlencoded({ extended: true }));

// const mongoURI = 'mongodb://localhost:27017'; // Replace with your MongoDB connection URI
// const dbName = 'bankingsystem';

// app.post('/register', async (req, res) => {
//     const { username, password } = req.body;

//     let client; // Declare the client variable here

//     try {
//         client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
//         await client.connect();

//         const db = client.db(dbName);
//         const usersCollection = db.collection('users');

//         const existingUser = await usersCollection.findOne({ username });

//         if (existingUser) {
//             return res.status(400).send('User already registered');
//         }

//         await usersCollection.insertOne({ username, password });

//         res.status(200).send('Registration successful');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     } finally {
//         if (client) {
//             client.close();
//         }
//     }
// });

// app.post('/login', async (req, res) => {
//     const { username, password } = req.body; // Add this line to extract username and password

//     try {
//         // Check if username and password match
//         const user = await db.collection('users').findOne({ username, password });

//         if (!user) {
//             return res.status(401).json({ message: 'Invalid username or password' });
//         }

//         res.status(200).json({ message: 'Login successful', user });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });


// app.listen(port, () => {
//     console.log(`Server listening at http://localhost:${port}`);
// });





// const express = require('express');
// const { MongoClient } = require('mongodb');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 5500;

// app.use(bodyParser.urlencoded({ extended: true }));

// const mongoURI = 'mongodb://localhost:27017'; // Replace with your MongoDB connection URI
// const dbName = 'bankingsystem';

// app.post('/register', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
//         await client.connect();

//         const db = client.db(dbName);
//         const usersCollection = db.collection('users');

//         const existingUser = await usersCollection.findOne({ username });

//         if (existingUser) {
//             return res.status(400).send('User already registered');
//         }

//         await usersCollection.insertOne({ username, password });

//         res.status(200).send('Registration successful');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     } finally {
//         client.close();
//     }
// });

// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     // Step 9: Handle Login Requests
//     try {
//         // Check if username and password match
//         const user = await db.collection('users').findOne({ username, password });

//         if (!user) {
//             return res.status(401).json({ message: 'Invalid username or password' });
//         }

//         res.status(200).json({ message: 'Login successful', user });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server listening at http://localhost:${port}`);
// });

