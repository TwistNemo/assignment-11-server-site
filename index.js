const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();


// middleware 
app.use(cors());
app.use(express.json());



// pass : mdCRqWra2UNJ3D7s 


// const uri = `mongodb+srv://dbuser1:mdCRqWra2UNJ3D7s@cluster0.y9wd8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y9wd8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const productsCollection = client.db('foodFactoryDB').collection('products');


        // insert product 
        app.post('/product', async (req, res) => {
            const product = req.body;
            // console.log("user data", product);
            const products = await productsCollection.insertOne(product);
            res.send(products);
        })


        // get product 
        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = productsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })


        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const products = await productsCollection.findOne(query);
            res.send(products);
        });






        // DELETE
        app.delete('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productsCollection.deleteOne(query);
            res.send(result);
        });


        // update user
        app.put('/product/:id', async (req, res) => {
            const id = req.params.id;
            const updatedUser = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    name: updatedUser.name,
                    email: updatedUser.email
                }
            };
            const result = await productsCollection.updateOne(filter, updatedDoc, options);
            res.send(result);

        })






    }












    finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running foodfactory Server');
});

app.listen(port, () => {
    console.log('Listening to port', port);
})
