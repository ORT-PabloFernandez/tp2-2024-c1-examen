import { ObjectId } from "mongodb";
import getConnection from "./conn.js";
const DATABASE = "sample_supplies";
const SALES = "sales";

export async function getAllSales(pageSize, page) {
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

export async function getSaleById(id) {
  const connectiondb = await getConnection();
  const sale = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .findOne({ _id: new ObjectId(id) });
  if (!sale) throw new Error(`No existe venta con id: ${id}`);
  return sale;
}

export async function getSaleByLocation(location, pageSize, page) {
  const connectiondb = await getConnection();
  const salesByLocation = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({ storeLocation: location })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return salesByLocation;
}

export async function getSalesFiltered(
  location,
  purchaseMethod,
  couponUsed,
  pageSize,
  page
) {
  let salesFiltered = await getAllSales(pageSize, page);

  if (location) {
    salesFiltered = salesFiltered.filter(
      (sale) => sale["storeLocation"] == location
    );
  }
  if (purchaseMethod) {
    salesFiltered = salesFiltered.filter(
      (sale) => sale["purchaseMethod"] == purchaseMethod
    );
  }
  if (couponUsed !== undefined) {
    const b = couponUsed === "true";
    salesFiltered = salesFiltered.filter((sale) => sale["couponUsed"] == b);
  }

  return salesFiltered;
}

export async function getTop10Productos(pageSize, page) {
  const sales = await getAllSales(pageSize, page);

  const contProds = {};

  sales.forEach((sale) => {
    sale.items.forEach((item) => {
      if (contProds[item.name]) {
        contProds[item.name] += item.quantity;
      } else {
        contProds[item.name] = item.quantity;
      }
    });
  });

  const top10prods = Object.entries(contProds)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([name, quantity]) => ({ name, quantity }));

  return top10prods;
}

export async function getUsersBySatisfaction() {
  const sales = await getAllSales(0, 0);

  const contUsers = {};

  sales.forEach((sale) => {
    contUsers[sale.customer.email] = sale.customer.satisfaction;
  });

  const usersBySatisfaction = Object.entries(contUsers)
    .sort(([, a], [, b]) => a - b)
    .map(([email, satisfaction]) => ({ email, satisfaction }));

  return usersBySatisfaction;
}
