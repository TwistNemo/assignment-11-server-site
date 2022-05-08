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


const uri = `mongodb+srv://dbuser1:mdCRqWra2UNJ3D7s@cluster0.y9wd8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const productsCollection = client.db('foodFactoryDB').collection('products');


        // insert product 
        app.post('/product', async (req, res) => {
            const product = req.body;
            console.log("user data", product);
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


        //         app.get('/product/:id', async(req, res) =>{
        //             const id = req.params.id;
        //             const query={_id: ObjectId(id)};
        //             const products = await productsCollection.findOne(query);
        //             res.send(products);
        //         });




        //     }












        // async function run() {
        //     try {
        //         await client.connect();
        //         const productCollection = client.db('foodFactoryDB').collection('products');

        //         app.get('/product', async (req, res) => {
        //             const query = {};
        //             const cursor = productCollection.find(query);
        //             const products = await cursor.toArray();
        //             res.send(products);
        //         });

        // app.get('/product/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const product = await productCollection.findOne(query);
        //     res.send(product);
        // });

        // // POST
        // app.post('/product', async (req, res) => {
        //     const newService = req.body;
        //     const result = await productCollection.insertOne(newService);
        //     res.send(result);
        // });

        // // DELETE
        // app.delete('/product/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const result = await producteCollection.deleteOne(query);
        //     res.send(result);
        // });

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
