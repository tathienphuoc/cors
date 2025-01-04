const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;

// Replace with your MongoDB connection string
const uri =
    'mongodb+srv://ipmeetip:ipmeetip@cluster0.jn1eb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

let db, collection;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
MongoClient.connect(uri, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database');
        db = client.db('forward_email_v2');
        collection = db.collection('history');
    })
    .catch(error => console.error(error));

// API endpoints
app.post('/forwardEmailHistory', async (req, res) => {
    try {
        const items = await collection.find().toArray();
        return res.json(items);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
