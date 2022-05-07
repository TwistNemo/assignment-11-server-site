const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
// require('dotenv').config();
const port = process.PORT || 5000;
const app = express();


// middleware 
app.use(cors());
app.use(express.json());



// pass : mdCRqWra2UNJ3D7s 


const uri = "mongodb+srv://dbuser1:mdCRqWra2UNJ3D7s@cluster0.y9wd8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const productsCollection = client.db('foodFactoryDB').collection('products');


        // insert product 
        app.post('/product', async (req, res) => {
            const product = req.body;
            console.log("user data", product);
            // const user = { name: 'Mahiya mahi', email: 'sinthia@gmail.com' };
            const result = await productsCollection.insertOne(product);
            res.send(result);
        })

        // get product 
        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = productsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })



        // const user = { name: 'Mahiya mahi', email: 'sinthia@gmail.com' };
        // const result = await userCollection.insertOne(user);
        // console.log(`user inserted with id: ${result.insertedId}`)

    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);








app.get('/', (req, res) => {
    res.send('Running Genius Server');
});


app.listen(port, () => {
    console.log("listening to port", port);
})