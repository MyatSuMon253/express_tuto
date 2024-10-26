const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://admin_user:Leco2uL3MsotRNQO@cluster0.h5s24.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "express_tuto";
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
