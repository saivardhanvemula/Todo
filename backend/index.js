const express = require("express");
const cors = require("cors");
const { MongoClient,ObjectId } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

app.get("/", (req, res) => {
    res.send("welcome to ToDo server");
});
app.get("/data", async (req, res) => {
    try {
        await client.connect();
        const db = client.db("Todo");
        const collection = db.collection("todos");
        const data = await collection.find({}).toArray();
        // console.log(data);
        res.json(data);
        await client.close();
    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: "Server Error" });
    }
});
app.post("/addTodo", async (req, res) => {
    try {
        let data = req.body;
        // console.log(data);
        await client.connect();
        const db = client.db("Todo");
        const collection = db.collection("todos");
        let d = await collection.insertOne(data);
        console.log("New todo is added to the database", data);
    } catch (error) {
        res.status(500).json({ Error: "Server Error" });
    }
});
app.post("/toggle", async (req, res) => {
    try {
        let { title } = req.body;
        console.log(title);
        await client.connect();
        const db = client.db("Todo");
        const collection = db.collection("todos");
        let response = await collection.updateOne({ title }, [
            {
                $set: {
                    completed: { $not: "$completed" },
                },
            },
        ]);
        if (response.matchedCount === 0) {
            return res.status(404).json({ error: "Todo item not found" });
        }
        res.json("updated");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});
app.post("/getTodos", async (req, res) => {
    let { UserID, Password } = req.body;
    console.log(UserID, Password);
    try {
        await client.connect();
        const db = client.db("Todo");
        const collection = db.collection("users");
        const data =await collection.findOne({ UserID: UserID, Password: Password }) ;
        // const data=await collection.find({}).toArray()
        if(!data){
            return res.status(401).json({ Error: "Invalid credentials" });
        }
        let ids=data.todos
        try {
            await client.connect();
            const db = client.db("Todo");
            const collection = db.collection("todos");
    
            // Convert string ObjectIds to actual ObjectId type
            const objectIdArray = ids.map(id => new ObjectId(id));
    
            // Query to find all documents with ObjectIds in the provided array
            const todos = await collection.find({ _id: { $in: objectIdArray } }).toArray();
            console.log(todos);
            
            res.json(todos);
        }catch (error) {
            console.error('Error fetching todos:', error);
            res.status(500).json({ Error: "Server Error" });
        console.log(data.todos);
        // console.log(data.response)
        // res.json(data.todos);
    }} catch (error) {
        console.error(error);
        res.status(500).json({ Error: "Server Error" });
    }
});
app.listen(port, () => {
    console.log("Server running on PORT 3000");
});
