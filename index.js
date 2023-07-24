const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');

const cors = require('cors')
require('dotenv').config()

const port = process.env.port || 5000

app.use(cors())
app.use(express.json())
// collegesDB
// cFRAH2W2CITBYrGA



const uri = "mongodb+srv://aideStore:v7pp61vbTGH1ltwF@cluster0.psezczp.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const collegeCollection = client.db('collegesdb').collection('colleges')


    app.get('/college',async(req,res) =>{
        const result = await collegeCollection.find().toArray();
        res.send(result);
    })

    app.get('/college/:id', async(req,res) =>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await collegeCollection.findOne(query);
      res.send(result);

    })

    // app.post('/cart', async(req,res) =>{
    //     const item = req.body
    //     console.log(item)
    //     const result = cartCollection.insertOne(item)
    //     res.send(result)
    // })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
















app.get('/', (req,res) =>{
    res.send('Colleges booked server')
})
app.listen(port,() =>{
    console.log(`collesge booking ${port}`)
})
