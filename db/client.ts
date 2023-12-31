// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb";
import mongoose from "mongoose";

declare global {
    var _mongoClientPromise : Promise<MongoClient> 
}


if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
console.log(uri);
const options = {
  connectTimeoutMS: 30000, // 30 seconds
  socketTimeoutMS: 30000,  // 30 seconds
};

let client;
let clientPromise: Promise<MongoClient>;


if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise ) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
    console.log("Database connected")
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
  console.log("Data base connected")
}

const connect = ()=>{
  mongoose.connect(uri);
  const connection = mongoose.connection;

  connection.on('connected',()=>{
    console.log("Data base Connected with funciton connect")
  })

  connection.on('error',()=>{
    console.log("Database connection failed")
  })
  
}
// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export {
  clientPromise,
  connect
};
