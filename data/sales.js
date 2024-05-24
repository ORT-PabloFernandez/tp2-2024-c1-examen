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

async function getSaleById(id) {
  const connectiondb = await getConnection();
  let sale;
  try {
    sale = await connectiondb
      .db(DATABASE)
      .collection(SALES)
      .findOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw new Error('Invalid ID format');
  }
  return sale;
}

async function getSalesByLocation(pageSize, page, location) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({ storeLocation: { $in: [location] } })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return sales;
}

async function getTopProducts(pageSize, page) {
  // Validar que pageSize y page sean valores positivos
  if (pageSize <= 0 || page <= 0) {
    throw new Error("pageSize and page must be positive values.");
  }
  

  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.name",
          total: { $sum: "$items.price" },
          count: { $sum: "$items.quantity" },
        },
      },
      { $sort: { count: -1 } },
      { $skip: pageSize * (page - 1) },
      { $limit: pageSize },
    ])
    .toArray();

  return sales;
}

async function getSalesBySatisfaction(pageSize, page) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({ 'customer.satisfaction': { $gt: 0 } })
    .sort({ 'customer.satisfaction': -1 }) 
    .project({ 'customer.email': 1, 'customer.satisfaction': 1 }) 
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return sales;
}


async function getSalesByLocationPurchaseAndCupon(pageSize, page, storeLocation, purchaseMethod, couponUsed) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
      .db(DATABASE)
      .collection(SALES)
      .find({
          storeLocation: storeLocation,
          purchaseMethod: purchaseMethod,
          couponUsed: couponUsed
      })
      .limit(pageSize)
      .skip(pageSize * page)
      .toArray();
  return sales;
}



export { getAllSales, getSaleById, getSalesByLocation, getSalesByLocationPurchaseAndCupon, getTopProducts, getSalesBySatisfaction};
