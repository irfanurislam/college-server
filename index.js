const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
    // await client.connect();
    // Send a ping to confirm a successful connection

    const collegeCollection = client.db('collegesdb').collection('colleges')
    const admissionCollection = client.db('collegesdb').collection('details')


    app.get('/college',async(req,res) =>{
        const result = await collegeCollection.find().toArray();
        res.send(result);
    })

    app.get('/topcollege', async(req,res) =>{
      const searchTerm = req.query.searchTerm
      let query = {}; // Create an empty query object

      // If the search term is provided, update the query to search for college names that match the search term
      if (searchTerm && searchTerm.trim() !== '') {
        query = { name: { $regex: new RegExp(searchTerm, 'i') } };
      }
    
      try {
        const result = await collegeCollection.find(query).toArray();
    
        // Check if there are no matches for the provided search term
        if (result.length === 0) {
          return res.status(404).json({ message: 'No colleges available for the given search term.' });
        }
    
        res.send(result);
      } catch (error) {
        console.error('Error fetching colleges:', error);
        res.status(500).send('Error fetching colleges');
      }
    });




    app.get('/college/:id', async(req,res) =>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await collegeCollection.findOne(query);
      res.send(result);

    })

    app.get('/addmissonform', async(req,res) =>{
      const result = await admissionCollection.find().toArray();
      res.send(result);
    })

    app.get('/addmissonform/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await admissionCollection.findOne(query); 
      res.send(result);
    });
    

    app.post('/addmissonform', async(req,res) =>{
        const item = req.body
        console.log(item)
        const result = admissionCollection.insertOne(item)
        res.send(result)
    })



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
