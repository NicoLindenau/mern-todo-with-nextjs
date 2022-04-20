require("dotenv").config()
const express = require("express")
const { ObjectId } = require("mongodb")
const cors = require("cors")
const connectToDatabase = require("./db")

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cors())

// create a todo
app.post("/todos", async (req, res) => {
  const { newTodo } = req.body
  try {
    const client = await connectToDatabase()
    const db = client.db()
    await db.collection("todo").insertOne({ item: newTodo, done: false })
    client.close()
    res.json("new item added")
  } catch (error) {
    console.error(error.message)
  }
})

// read all todos
app.get("/todos", async (req, res) => {
  try {
    const client = await connectToDatabase()
    const db = client.db()
    const response = await db.collection("todo").find().toArray()
    client.close()
    res.json(response)
  } catch (error) {
    console.error(error.message)
  }
})

// update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { updatedItem } = req.body
    const { done } = req.body
    if (updatedItem !== undefined) {
      const mongoId = new ObjectId(req.params.id)
      const client = await connectToDatabase()
      const db = client.db()
      await db
        .collection("todo")
        .updateOne({ _id: mongoId }, { $set: { item: updatedItem } })
      client.close()
    } else {
      const mongoId = new ObjectId(req.params.id)
      const client = await connectToDatabase()
      const db = client.db()
      await db
        .collection("todo")
        .updateOne({ _id: mongoId }, { $set: { done: done } })
      client.close()
    }

    res.json("updated")
  } catch (error) {
    console.error(error.message)
  }
})

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const mongoId = new ObjectId(req.params.id)
    const client = await connectToDatabase()
    const db = client.db()
    await db.collection("todo").deleteOne({ _id: mongoId })
    res.json("deleted")
    client.close()
  } catch (error) {
    console.error(error.message)
  }
})

app.listen(PORT, console.log("server running on port " + PORT))
