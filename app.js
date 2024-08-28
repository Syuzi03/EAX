require('dotenv').config()
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const bodyParser = require('body-parser');

const client = new MongoClient('mongodb://127.0.0.1:27017');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/products', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('syuzidb');
        const collection = db.collection('products');
        const { name, price } = req.body;
        const result = await collection.insertOne({name, price});
        res.send(result);
    } finally {
        await client.close();
    }
});

app.get('/products', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('syuzidb');
        const collection = db.collection('products');
        const result = await collection.find().toArray();
        res.send(result);
    } finally {
        await client.close();
    }
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
