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
  try {
    const connectiondb = await getConnection();
    const sale = await connectiondb
      .db(DATABASE)
      .collection(SALES)
      .findOne({ _id: new ObjectId(id) });

    if (!sale) {
      throw new Error("Sale not found");
    }

    return sale;
  } catch (e) {
    console.error("Error", e.message);
  }
}

async function getSalesByLocation(location) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({ "storeLocation": { $regex: new RegExp(location, "i") } })
    .toArray()
  return sales;
}

async function getSalesFilteredByLocPurMethodAndCoup(location, purMethod, coupon) {
  try {
    const connectiondb = await getConnection();

    const sales = await connectiondb
      .db(DATABASE)
      .collection(SALES)
      .find({
        "storeLocation": { $regex: new RegExp(location, "i") },
        $and: [
          { "purchaseMethod": purMethod },
          { "couponUsed": coupon }
        ]
      })
      .toArray();

    return sales;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function getTopSales() {
  const connectiondb = await getConnection();
  const topSales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .aggregate([
      {
        $unwind: "$items"
      },
      {
        $group: {
          _id: "$items.name",
          totalQuantity: { $sum: "$items.quantity" }
        }
      },
      {
        $sort: { totalQuantity: -1 }
      },
      {
        $limit: 10
      }
    ])
    .toArray();

  return topSales;
}

async function getClientsBySatisfaction() {
  const connectiondb = await getConnection();

  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({ 'customer.satisfaction': { $exists: true } })
    .sort({ 'customer.satisfaction': -1 })
    .toArray();

  return sales;
}

export { getAllSales, getSaleById, getSalesByLocation, getSalesFilteredByLocPurMethodAndCoup, getTopSales, getClientsBySatisfaction };
