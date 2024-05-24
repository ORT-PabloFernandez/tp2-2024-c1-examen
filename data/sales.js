import getConnection from "./conn.js";
import { ObjectId } from 'mongodb';
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


async function getSaleByLocation(storeLocation) {
  const clientmongo = await getConnection();
  const location = await clientmongo
    .db(DATABASE)
    .collection(SALES)
    .find({storeLocation})
    .toArray();
  return location;
}

async function getFilterSales(storeLocation, purchaseMethod, couponUsed, pageSize, page) {
  const clientmongo = await getConnection();
  const sales = await clientmongo
    .db(DATABASE)
    .collection(SALES)
    .find({
      $and: [
        { storeLocation: storeLocation },
        { purchaseMethod: purchaseMethod },
        { couponUsed: Boolean(couponUsed)}
      ]
    })
    .toArray();
  
  return sales;
}


async function getTenSales() {
  const clientmongo = await getConnection();
  const ten = await clientmongo
    .db(DATABASE)
    .collection(SALES)
    .find()
    .sort({ 'items.quantity': -1 })
    .limit(10)
    .toArray();
  return ten;
}


async function getCustomersBySatisfaction(orden = 'desc') {
const clientmongo = await getConnection();
const order = orden === 'asc'? 1: -1;
const customers = await clientmongo
    .db(DATABASE)
    .collection(SALES)
    .aggregate([
      {
        $group: {
          _id: '$customer.email',
          name: { $first: '$customer.name' },
          satisfaction: { $avg: '$customer.satisfaction' }
        }
      },
      { $sort: { satisfaction: order } }
    ])
    .toArray();
  return  customers;
}

//ejemplo id: 5bd761dcae323e45a93cd061
async function getSale(id) {
  const clientmongo = await getConnection();
  const sale = await clientmongo
    .db(DATABASE)
    .collection(SALES)
    .findOne({ _id: new ObjectId(id) });
  return sale;
}

export { getAllSales, getSale, getSaleByLocation, getFilterSales, getTenSales, getCustomersBySatisfaction };
