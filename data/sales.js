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

export async function getSale(_id) {
  const connectiondb = await getConnection();
  const sale = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .findOne({ _id: new ObjectId(_id) });

  return sale;
}

export async function getSalesByLocation(pageSize, page, storeLocation) {
  const connectiondb = await getConnection();
  const locationSales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({ storeLocation: storeLocation })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();

  return locationSales;
}

export async function getSalesFilteredBy(
  pageSize,
  page,
  storeLocation,
  purchaseMethod,
  couponUsed
) {
  const connectiondb = await getConnection();
  const salesFiltered = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({
      storeLocation: storeLocation,
      purchaseMethod: purchaseMethod,
      couponUsed: couponUsed,
    })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return salesFiltered;
}

export async function getTopTenSales() {}

export async function getClientsOrderedBySatisfaction(pageSize, page) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({})
    .sort({ "customer.satisfaction": -1 })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return sales;
}
