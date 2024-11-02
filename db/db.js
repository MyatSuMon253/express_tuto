require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
let dbInstance;

async function connectDB() {
  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    console.log("Connected to Mongodb");

    dbInstance = client.db(dbName);
    return dbInstance;
  } catch (error) {
    console.log("Error connecting to mongodb");
  }
}

function getDB() {
  if (!dbInstance) {
    throw new Error("Database not initialized");
  }
  return dbInstance;
}

module.exports = {
  connectDB,
  getDB,
};
