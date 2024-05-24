import express from "express";
import {ObjectId} from 'mongodb'
import { getAllSales,getSaleById,getSalesByStoresLocations,getSalesByManyFilters,getSalesOrderBySatisfaction,getAllSalesNoParams } from "../data/sales.js";

const router = express.Router();

//http://localhost:3000/api/sales?page=1&pageSize=1
router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  res.json(await getAllSales(pageSize, page));
});

//http://localhost:3000/api/sales/storesLocations?storesLocations=Denver&page=1&pageSize=10
//http://localhost:3000/api/sales/storesLocations?storesLocations=Denver,Seattle&page=1&pageSize=10
router.get("/storesLocations", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const storesLocations = (req.query.storesLocations).split(",")

  const sales = await getSalesByStoresLocations(pageSize, page, storesLocations) 
  res.json(sales);
});

//http://localhost:3000/api/sales/manyFilters?page=1&pageSize=50&storesLocations=Denver&purchaseMethods=Online&couponsUsed=false
//http://localhost:3000/api/sales/manyFilters?page=1&pageSize=50&storesLocations=Denver,Seattle&purchaseMethods=Online&couponsUsed=false,true
router.get("/manyFilters", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const storesLocations = (req.query.storesLocations).split(",")
  const purchaseMethods = (req.query.purchaseMethods).split(",")
  let couponsUsed = (req.query.couponsUsed).split(",")
  couponsUsed = couponsUsed.map(str => JSON.parse(str));// Paeseamos el string y lo convertimos en boolean

  const sales = await getSalesByManyFilters(pageSize, page, storesLocations,purchaseMethods,couponsUsed) 
  res.json(sales);
});

//http://localhost:3000/api/sales/orderBySatisfaction?page=1&pageSize=5
//http://localhost:3000/api/sales/orderBySatisfaction?page=1000&pageSize=5
router.get("/orderBySatisfaction", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  const sales = await getSalesOrderBySatisfaction(pageSize, page) 
  res.json(sales);
});

//http://localhost:3000/api/sales/masVendidos
router.get("/masVendidos", async (req, res) => {
  let items = {} //Aca guardamos cuanto se vendio de cada producto

  const sales = await getAllSalesNoParams()
  for (let i = 0; i < sales.length; i++) {//Para cada sale
    let sale = sales[i];

    for (let j = 0; j < sale["items"].length; j++) {//Para cada item de sale
      let item = sale["items"][j];

      if (items[item["name"]] == undefined){//Si no existe el elemento en el objeto se lo creo con la cantidad que tiene
        items[item["name"]] = item["quantity"]
      }
      else {//Si ya existe le sumo la cantidad
        items[item["name"]] += item["quantity"]
      }
    }
  }

  let itemsArray = Object.entries(items);//Convertimos objeto en array
  itemsArray.sort((a, b) => b[1] - a[1]);//Ordenamos el array
  let sortedItems = Object.fromEntries(itemsArray);//Convertimos el array en objeto
  res.json(sortedItems);
});

//http://localhost:3000/api/sales/5bd761dcae323e45a93cd0f3
router.get("/:id", async (req, res) => {
  const { id } = req.params
  const s_id = new ObjectId(id);
  const sale = await getSaleById(s_id) 
  res.json(sale);
});

export default router;
