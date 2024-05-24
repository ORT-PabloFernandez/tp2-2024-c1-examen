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
    .findOne({ _id: id });
  return sale;
}

async function getByStoreLocation(storeLocation, pageSize, page) {
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

async function getByLocationAndPurchaseMethod(
  storeLocation,
  purchaseMethod,
  couponUsed,
  pageSize,
  page
) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({
      storeLocation: storeLocation,
      purchaseMethod: purchaseMethod,
      couponUsed: Boolean(couponUsed),
    })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return sales;
}

async function getTopTenSoldItems() {
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
      { $limit: 10 },
    ])
    .toArray();
  return sales;
}

async function getAllCustomersBySatisfaction() {
  const connectiondb = await getConnection();
  const customers = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({})
    .sort({ "customer.satisfaction": -1 })
    .project({ customer: 1 })
    .toArray();
  return customers;
}

export {
  getAllSales,
  getSaleById,
  getByStoreLocation,
  getByLocationAndPurchaseMethod,
  getTopTenSoldItems,
  getAllCustomersBySatisfaction,
};
