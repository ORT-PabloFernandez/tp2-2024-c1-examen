import getConnection from "./conn.js";
const DATABASE = "sample_supplies";
const MOVIES = "sales";

export async function getAllSales(pageSize, page) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({})
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return sales;
}

export async function getSale(id) {
  const connectiondb = await getConnection();

  const sale = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .findOne({ _id: new ObjectId(id) });

    if (!sale ){
      throw new Error ("Sale not found");
    }

  return sale;
}

export async function getSalesLocation(location) {
  const connectiondb = await getConnection();

  const salesLocation = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({storeLocation: location})
    .toArray();

  return salesLocation;
}

