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
  const query = [];
  if(location) query.storeLocation = location;
  if(metodo) query.purchaseMethod = metodo;
  query.couponUsed = 'true';

  const sales = await connectiondb
      .db(DATABASE)
      .collection(SALES)
      .find(query)
      .toArray();
  return sales;
}

//Funcion ejercicio4
async function getMasVendidos(){
  const connectiondb = await getConnection();
  const sales = await connectiondb
        .db(DATABASE)
        .collection(SALES)
        .aggregate([
          {$unwind: '$items'},
          {$group: {_id: '$items.Document.name', totalVendido: {$sum: '$items.Document.quantity' } } },
          {$sort: { totalVendido: -1} },
          {$limit: 10}
        ]);
  return sales;
}

//Funcion ejercicio5
//async function get
export { getAllSales, getById, getSalesByLocation, getMasVendidos, getPorFiltrado };
