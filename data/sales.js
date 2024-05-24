import getConnection from "./conn.js";
import { ObjectId } from "mongodb";
const DATABASE = "sample_supplies";
const SALES = "sales";

async function getAllSales(pageSize, page) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({})
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return sales;
}

 async function getSale(id) {
  const clientmongo = await getConnection();
  const sale = await clientmongo
    .db(DATABASE)
    .collection(SALES)
    .findOne({ _id: new ObjectId(id) });
  return sale;
}

 async function getSalesLocation(pageSize, page, location) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({ "storeLocation": { $regex: new RegExp(location, "i") } })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
    
  return sales;
}

async function getAllItems(pageSize, page,) {
  const connectiondb = await getConnection();
  const items = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({})
    .sort({ "items.quantity": -1 })
    .project({ 'items': 1, '_id': 0 })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();


  return items;
}

async function getAllCustomers() {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({ 'customer.satisfaction': { $exists: true } })
    .sort({ 'customer.satisfaction': -1 }) 
    .project({ 'customer': 1, '_id': 0 })
    .toArray();
  return sales;
}

export { getAllSales, getSalesLocation, getAllItems, getAllCustomers, getSale};
