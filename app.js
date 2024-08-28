const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const bodyParser = require('body-parser');

const client = new MongoClient('mongodb://localhost:27017');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/products', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('eax1');
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
        const db = client.db('eax1');
        const collection = db.collection('products');
        const result = await collection.find().toArray();
        res.send(result);
    } finally {
        await client.close();
    }
});

const DEFAULT_PORT_VALUE = 3000;
const PORT = process.env.PORT || DEFAULT_PORT_VALUE;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
