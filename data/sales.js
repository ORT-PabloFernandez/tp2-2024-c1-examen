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
      .findOne({ _id: new ObjectId(id) })
  } catch (error) {
    throw new Error('Formato inválido de ID');
  }
  return sale;
}

async function getSalesByStoreLocation(storeLocation, purchaseMethod, couponUsed) {
  const connectiondb = await getConnection();
  let query = { storeLocation: storeLocation };
  if(purchaseMethod != undefined && couponUsed != undefined){
    query.purchaseMethod = purchaseMethod;
    query.couponUsed = couponUsed;
  }
  //console.log(query);
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find(query)
    .toArray();
  return sales;
}

async function getMostSelledProducts(){
  const connectiondb = await getConnection();
  const mostSelledProducts = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .aggregate([
      { $unwind: "$items" },
      { $group: {_id: "$items.name", cantidadVendidos: { $sum: "$items.quantity" }}},
      { $sort: { cantidadVendidos: -1 } },
      { $limit: 10 }
    ])
    .toArray();
    return mostSelledProducts;
}

async function getCustomersOrderBySatisfaction(){
  const connectiondb = await getConnection();
  const customersOrderBySatisfaction = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .aggregate([
      { $unwind: "$customer" },
      { $group: {_id: "$customer.email", satisfactionPromedio: { $avg: "$customer.satisfaction" }}},
      { $sort: { satisfactionPromedio: -1 } },
    ])
    .toArray();
    return customersOrderBySatisfaction;

}

export { getAllSales, getSaleById,getSalesByStoreLocation, getMostSelledProducts, getCustomersOrderBySatisfaction };
