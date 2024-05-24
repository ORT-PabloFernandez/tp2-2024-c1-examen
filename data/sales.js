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

async function getSalesByLocation(pageSize, page, location) {
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

async function getSalesByLocationAndPurchaseMethod(
  pageSize,
  page,
  location,
  purchaseMethod,
) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({
      storeLocation: location,
      purchaseMethod: purchaseMethod,
    })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return sales;
}

export { getAllSales };
export { getSalesByLocation };
export { getSalesByLocationAndPurchaseMethod };
