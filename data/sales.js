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

async function getSaleById(id) {
  const connectiondb = await getConnection();
  const sale = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .findOne({ _id: new ObjectId(id) });

  return sale;
}

async function getSaleByLocation(sLocation, pageSize, page) {
  const connectiondb = await getConnection();
  const saleByLocation = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({ storeLocation: sLocation })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();

  return saleByLocation;
}

async function getFilterSale(sLocation, purchaseMethod, pageSize, page) {
  const connectiondb = await getConnection();

  const saleByLocation = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({ storeLocation: sLocation } || { purchaseMethod: purchaseMethod })
    .project({ _id: 0, storeLocation: 1, purchaseMethod: 1, couponUsed: 1 })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return saleByLocation;
}

async function masVendidos(pageSize = 10) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.name",
          totalQuantity: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalQuantity: -1 } },
    ])
    .limit(pageSize)
    .toArray();

  return sales;
}

async function customer() {
  const connectiondb = await getConnection();
  const customers = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({})
    .sort({ "customer.satisfaction": 1 })
    .project({
      _id: 0,
      "customer.gender": 1,
      "customer.age": 1,
      "customer.email": 1,
      "customer.satisfaction": 1,
    })
    .toArray();

  return customers;
}

export {
  getAllSales,
  getSaleById,
  getSaleByLocation,
  getFilterSale,
  masVendidos,
  customer,
};
