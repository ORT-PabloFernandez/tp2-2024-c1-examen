import express from "express";
import { getAllSales, getSaleById, getSaleByLocation, getFilterSale, masVendidos } from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/location/:location", async (req, res) => {
    const saleLocation = req.params.location;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    const sales = await getSaleByLocation(saleLocation, pageSize, page);
    res.json(sales);
});


router.get("/filterSale/:location/:purchaseMethod", async (req, res) => {
  const saleLocation = req.params.location;
  const pMethod = req.params.purchaseMethod;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const filterSale = await getFilterSale(saleLocation, pMethod, pageSize, page);
  res.json(filterSale);
});

router.get("/masVendidos" , async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
  const vendidos = await masVendidos(pageSize);
  
  res.json(vendidos);

})



router.get("/:id", async (req, res) => {
  const sale = await getSaleById(req.params.id);
  res.json(sale);
});
export default router;
