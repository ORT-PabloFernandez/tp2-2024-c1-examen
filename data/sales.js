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

async function getSalesById(id) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .findOne({ _id: new ObjectId(id) });
    return sales; 
}

async function getSalesByStoreLocation(pageSize, page, storeLocation) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({ storeLocation:storeLocation })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return sales;
}
async function getSalesByFilter(pageSize, page, storeLocation,couponUsed,purchaseMethod){
  const connectiondb = await getConnection();
  const sales = await connectiondb
  .db(DATABASE)
  .collection(SALES)
  .find({storeLocation: storeLocation, purchaseMethod: purchaseMethod,couponUsed: couponUsed})
  .limit(pageSize)
  .skip(pageSize * page)
  .toArray();
  return sales;
}

async function getTopItems(pageSize, page) {
  const connectiondb = await getConnection();
  const movies = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({})
    .sort({ 'items.quantity': -1 }) 
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return movies;
}

async function getCustomersSortedBySatisfaction(pageSize, page) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({})
    .limit(pageSize)
    .skip(pageSize * page)
    .sort({"customer.satisfaction": -1})
    .toArray();
  return sales;
}




export { getAllSales, getSalesById, getSalesByStoreLocation,getSalesByFilter,getTopItems,getCustomersSortedBySatisfaction};
