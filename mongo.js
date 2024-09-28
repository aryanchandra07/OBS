const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/'; // Replace with your actual connection string
const dbName = 'fewd'; // Replace with your database name

async function connectToMongo() {
    try {
        const client = await MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB successfully!');

        // Optional: Perform database operations here (e.g., find documents)
        // const db = client.db(dbName);
        // const collection = db.collection('your_collection_name');
        // ...

        await client.close();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToMongo();
