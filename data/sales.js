import getConnection from "./conn.js";
const DATABASE = "sample_supplies";
const SALES = "sales";
import { ObjectId } from "mongodb";

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

async function getSalebyId(id) {
  //console.log(">>" + id);
  const connectiondb = await getConnection();
  const sale = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .findOne({ _id: new ObjectId(id) });
  return sale;
}

async function getSalesByLocation(location, pageSize, page) {
  //console.log(">>" + id);
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({ storeLocation: location })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();

  return sales;
}

async function getSalesfiltered(cupon, method, location, pageSize, page) {
  const connectiondb = await getConnection();
  const query = {};

  if (location) {
    query.storeLocation = location;
  }
  if (method) {
    query.purchaseMethod = method;
  }
  if (cupon) {
    if ((cupon === "true")) {
      query.couponUsed = true;
    } else {
      query.couponUsed = false;
    }
    //console.log(query.couponUsed);
  }

  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find(query)
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return sales;
}

export { getAllSales, getSalebyId, getSalesByLocation, getSalesfiltered };
