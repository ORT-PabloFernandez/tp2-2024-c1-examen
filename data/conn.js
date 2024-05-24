import "dotenv/config";
import { MongoClient } from "mongodb";
const uri = "mongodb+srv://admin:tp2@cluster0.3bm3a.azure.mongodb.net/";

const client = new MongoClient(uri);

let instance = null;

export default async function getConnection() {
  if (instance == null) {
    try {
      instance = await client.connect();
    } catch (error) {
      console.log(err.message);
    }
  }
  return instance;
}
