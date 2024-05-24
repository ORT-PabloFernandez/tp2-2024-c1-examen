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

async function getAllSalesNoParams() {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({})
    .toArray();
  return sales;
}

async function getSaleById(id) {
  const connectiondb = await getConnection();
  const sale = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .findOne({_id:id})
  return sale;
}

async function getSalesByStoresLocations(pageSize, page, storesLocations) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({$or: storesLocations.map(location => ({ storeLocation: location }))})
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return sales;
}

async function getSalesByManyFilters(pageSize, page, storesLocations,purchaseMethods,couponsUsed) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({
      $and: [
        { storeLocation: { $in: storesLocations } },
        { purchaseMethod: { $in: purchaseMethods } },
        { couponUsed: { $in: couponsUsed } }
      ]
    }
    )
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return sales;
}

async function getSalesOrderBySatisfaction(pageSize, page) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({})
    .sort({ 'customer.satisfaction': -1 })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return sales;
}

export { getAllSales,getSaleById,getSalesByStoresLocations,getSalesByManyFilters,getSalesOrderBySatisfaction,getAllSalesNoParams };
