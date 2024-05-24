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

async function findSale(_id) {
  const connectiondb = await getConnection();
  const sale = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .findOne({ _id: new ObjectId(_id) });
  return sale;
}

async function getSaleByLocation(location) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({})
    .toArray();
  const salesByLocation = sales.filter(
    (sale) => sale.storeLocation.toLowerCase() == location
  );
  return salesByLocation;
}

async function getBestSellers() {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({})
    .toArray();

  const bestSellers = {};

  sales.forEach((sale) => {
    sale.items.forEach((item) => {
      const itemName = item.name;
      const quantity = item.quantity;

      if (!bestSellers[itemName]) {
        bestSellers[itemName] = 0;
      }

      bestSellers[itemName] += quantity;
    });
  });

  const bestSellersArray = Object.entries(bestSellers).map(
    ([name, quantity]) => {
      return { name, quantity };
    }
  );

  const orderedBestSellers = bestSellersArray.sort(
    (a, b) => b.quantity - a.quantity
  );

  const finalBestSellers = orderedBestSellers.slice(0, 10);

  return finalBestSellers;
}

async function getSalesByLocMethCoup(location, paymentMethod, coupon) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({})
    .toArray();

  const specificSales = sales.filter(
    (sale) =>
      sale.storeLocation.toLowerCase() == location &&
      sale.purchaseMethod.toLowerCase() == paymentMethod &&
      sale.couponUsed.toString().toLowerCase() == coupon
  );

  return specificSales;
}

async function getClientsBySatisfaction() {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({})
    .toArray();

  const clients = sales.map((sale) => sale.customer);

  const orderedClients = clients.sort((a, b) => b.satisfaction - a.satisfaction);

  return orderedClients;
}

export {
  getAllSales,
  findSale,
  getSaleByLocation,
  getSalesByLocMethCoup,
  getBestSellers,
  getClientsBySatisfaction,
};
