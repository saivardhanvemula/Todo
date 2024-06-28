const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

app.get("/data", async (req, res) => {
    try {
        await client.connect();
        const db = client.db("Todo");
        const collection = db.collection("todos");
        const data = await collection.find({}).toArray();
        console.log(data);
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
app.listen(5000, () => {
    console.log("Server running on PORT 5000");
});
