import { ObjectId } from "mongodb";
import getConnection from "./conn.js";

const DATABASE = "sample_supplies";
const SALES = "sales";

export async function getAllSales(pageSize, page) {
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
export async function getSale(id) {
  const clientmongo = await getConnection();
  const sale = await clientmongo
    .db(DATABASE)
    .collection(SALES)
    .findOne({ _id: new ObjectId(id) });
  return sale;
}
export async function getSalesByLocation(location) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({ storeLocation: location })
    .toArray();
  return sales;
}
export async function getSalesByFilter(location, medio, cupon) {
  const connectiondb = await getConnection();
  const filter = {};
  if (location) {
    filter.storeLocation == location;
  }
  if (medio) {
    filter.purchaseMethod == medio;
  }
  if (cupon) {
    filter.couponUsed == cupon;
  }
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find(filter)
    .toArray();
  return sales;
}

export async function getSatisfactionOrden(pageSize, page) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({})
    .project({ _id: 0, customer: 1 })
    .sort({ "customer.satisfaction": -1 })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return sales;
}
