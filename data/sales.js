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

async function getSaleById(saleId) {
  try {
    const connectiondb = await getConnection();
    const saleFound = await connectiondb
      .db(DATABASE)
      .collection(SALES)
      .findOne({ _id: new ObjectId(saleId) });

    return saleFound;
  } catch (err) {
    return "No sale found by that id"
  }
}

async function getSalesByLocation(storeLocation) {
  const connectiondb = await getConnection();
  const salesByLocation = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({ storeLocation: storeLocation })
    .toArray();

  return salesByLocation.length > 0 ? salesByLocation : "No sales found in that location";
}

async function getSalesByLocationPurchaseMethodAndCouponUsed(storeLocation, purchaseMethod, couponUsed) {
  const connectiondb = await getConnection();
  const salesFound = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({
      $and: [
        { storeLocation: storeLocation },
        { purchaseMethod: purchaseMethod },
        { couponUsed: couponUsed }
      ]
    })
    .toArray();

  return salesFound.length > 0 ? salesFound : "No sales found with those parameters";
}

async function getMostBoughtItems() {
  const connectiondb = await getConnection();
  const itemsSold = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({})
    .toArray();

  const listOfItems = itemsSold.map((object) => object.items.splice(0)).flat();

  let allSoldItems = {};
  listOfItems.forEach(item => {
    allSoldItems[item.name] = allSoldItems[item.name] == null ? item.quantity : allSoldItems[item.name] + item.quantity;
  });

  const soldItemsSorted = Object.keys(allSoldItems).sort((a, b) => { return allSoldItems[b] - allSoldItems[a] })
  const response = soldItemsSorted.map(itemName => {
    return {
      name: itemName,
      quantity: allSoldItems[itemName],
    }
  })

  return response.splice(0, 10);
}

async function getCustomersBySatisfaction() {
  const connectiondb = await getConnection();
  const customersBySatisfaction = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({})
    .sort({ "customer.satisfaction": -1 })
    .toArray();

  const response = customersBySatisfaction.map((object) => object.customer);
  return response;
}

export { getAllSales, getSaleById, getSalesByLocation, getSalesByLocationPurchaseMethodAndCouponUsed, getMostBoughtItems, getCustomersBySatisfaction };
