import express from "express";
import {
  getAllSales,
  getSale,
  getSalesByLocation,
  getSalesFilteredBy,
  getTopTenSales,
  getClientsOrderedBySatisfaction,
} from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/:_id", async (req, res) => {
  const sale = await getSale(req.params._id);
  res.json(sale);
});

router.get("/storeLocation/:storeLocation", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const storeLocation = req.params.storeLocation;
  const saleByLocation = await getSalesByLocation(
    pageSize,
    page,
    storeLocation
  );

  res.json(saleByLocation);
});

router.get("/storeLocationAndPurchaseMethod", async (req, res) => {
  const storeLocation = req.query.storeLocation;
  const purchaseMethod = req.query.purchaseMethod;
  const couponUsed = req.query.couponUsed;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const salesFiltered = await getSalesFilteredBy(
    pageSize,
    page,
    storeLocation,
    purchaseMethod,
    couponUsed
  );
  res.json(salesFiltered);
});

router.get("/satisfaction", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const sales = await getClientsOrderedBySatisfaction(pageSize, page);
  res.json(sales);
});

export default router;
