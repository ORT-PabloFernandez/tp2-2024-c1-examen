import getConnection from "./conn.js";
const DATABASE = "sample_supplies";
const MOVIES = "sales";
import { ObjectId } from "mongodb";

async function getAllSales(pageSize, page) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
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
    .collection(MOVIES)
    .findOne({ _id: new ObjectId(id) });
  return sale;
}

async function getSalesByLocation(storeLocation, pageSize, page) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ storeLocation: storeLocation })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return sales;
}

async function getSalesByComplexFilter(filters) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find(filters)
    .toArray();
  return sales;
}

async function getTop10Products() {
  const connectiondb = await getConnection();
  const topProducts = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .aggregate([
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.name",
          totalQuantity: { $sum: "$items.quantity" },
        },
      },
      {
        $sort: { totalQuantity: -1 },
      },
      {
        $limit: 10,
      },
    ])
    .toArray();

  return topProducts;
}

async function getClientsBySatisfaction(order, pageSize, page) {
  const connectiondb = await getConnection();
  const sortOrder = order === 'asc' ? 1 : -1;

  const clients = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({}, { "customer": 1, "customer.satisfaction": 1 })
    .sort({ "customer.satisfaction": sortOrder })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();

  return clients;
}

export {
  getAllSales,
  getSaleById,
  getSalesByLocation,
  getSalesByComplexFilter,
  getTop10Products,
  getClientsBySatisfaction
};
