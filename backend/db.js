const { MongoClient } = require("mongodb")

const connectionString = `mongodb+srv://${process.env.DBADMIN}:${process.env.DBPASSWORD}@cluster0.8rm0d.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

const connectToDatabase = async () => {
  try {
    const client = await MongoClient.connect(connectionString)
    return client
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectToDatabase
