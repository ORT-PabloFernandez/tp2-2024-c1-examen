import express from "express";
import {
  getAllSales,
  getSaleById,
  getByLocation,
  getFiltered,
  getBysatisfaction,
} from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/:_id", async (req, res) => {
  const sale = await getSaleById(req.params._id);
  res.json(sale);
});

router.get("/storeLocation/:storeLocation", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const storeLocation = req.params.storeLocation;
  res.json(await getByLocation(pageSize, page, storeLocation));
});

router.get("/filtered", async (req, res) => {
  const storeLocation = req.params.storeLocation;
  const purchaseMethod = req.params.purchaseMethod;
  const filtered = await getFiltered(storeLocation, purchaseMethod);
  res.json(filtered);
});

router.get("/satisfaction", async (req, res) => {
  const sales = await getBysatisfaction();
  res.json(sales);
});

export default router;
