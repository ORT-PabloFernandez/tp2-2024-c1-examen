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

//Funcion ejercicio1
async function getById(id){
  const connectiondb = await getConnection()
  const sales = await connectiondb
        .db(DATABASE)
        .collection(SALES)
        .findOne({ _id : new ObjectId(id) });
  return sales;
}

//Funcion ejercicio2
async function getSalesByLocation(location){
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({ storeLocation: location})
    .toArray();
    return sales;
}

//Funcion ejercicio3
async function getPorFiltrado(location, metodo){
  const connectiondb = await getConnection();
  const sales = await connectiondb
      .db(DATABASE)
      .collection(SALES)
      .find(sale => sale.storeLocation.equals(location) && sale.purchaseMethod.equals(metodo) && sale.couponUsed === 'true')
      .toArray();
  return sales;
}

//Funcion ejercicio4
async function getMasVendidos(){
  const connectiondb = await getConnection();
  const sales = await connectiondb
        .db(DATABASE)
        .collection(SALES);
  return sales;
}

export { getAllSales, getById, getSalesByLocation, getMasVendidos, getPorFiltrado };
