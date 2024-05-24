import getConnection from "./conn.js";
import {ObjectId} from "mongodb";
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
  try{
    sale = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .findOne({_id : new ObjectId(id)})
  }catch(error){
    console.log(error)
  }

  return sale;
}

async function getSalesByLocation(location){
  const connectiondb = await getConnection();
  try{
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({ "storeLocation": location})
    .toArray();
    return sales;
  }catch(error){
    console.log(error)
  }
  
}

async function getBestSales(){
  const connectiondb = await getConnection();
  try{
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .aggregate([
      { $unwind: "$items" },
      { $group: {_id: "$items.name", totalQuantity: { $sum: "$items.quantity" }}},
      { $sort: { totalQuantity: -1 } },
      { $limit: 10 }
    ])
    .toArray();
    return sales;
  }catch(error){
    console.log(error)
  }
  
}

async function getSalesByLocationPurchaseMethodCouponUsed(location, purchaseMethod, couponUsed){
  console.log(location)
  console.log(purchaseMethod)
  console.log(couponUsed)
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({ "storeLocation": location, "purchaseMethod": purchaseMethod, "couponUsed": couponUsed})
    .toArray();
  return sales;
}

export { getAllSales, getSaleById ,getBestSales , getSalesByLocationPurchaseMethodCouponUsed, getSalesByLocation};
