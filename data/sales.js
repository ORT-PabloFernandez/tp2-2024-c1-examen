import { ObjectId } from "mongodb";
import getConnection from "./conn.js";
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

async function getSaleById(_id) {
  const connectiondb = await getConnection();
  const sale = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .findOne({ _id: new ObjectId(_id) });

  return sale;
}

async function getByLocation(pageSize, page, storeLocation) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({ storeLocation: storeLocation })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();

  return sales;
}

async function getFiltered(storeLocation, purchaseMethod) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({
      storeLocation: storeLocation,
      purchaseMethod: purchaseMethod,
      couponUsed: true,
    })
    .toArray();

  return sales;
}

async function getBysatisfaction() {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({})
    .toArray();

  const orderedSales = sales.sort(
    (a, b) => b.customer.satisfaction - a.customer.satisfaction
  );
  return orderedSales;
}

export {
  getAllSales,
  getSaleById,
  getByLocation,
  getFiltered,
  getBysatisfaction,
};
