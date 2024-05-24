import express from "express";
import { getAllSales, getSaleById, getSalesByLocation, getSalesByComplexFilter, getTop10Products, getClientsBySatisfaction } from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/:id", async (req, res) => {
  try {
    const sale = await getSaleById(req.params.id);
    if (sale) {
      res.json(sale);
    } else {
      res.status(404).json({ message: "Sale not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/location/:location", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  try {
    const sales = await getSalesByLocation(req.params.location, page, pageSize);
    if (sales && sales.length > 0) {
      res.json(sales);
    } else {
      res.status(404).json({ message: "Sales not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/complex/filter", async (req, res) => {

  const { storeLocation, purchaseMethod, couponUsed } = req.query;

  const filters = {};
  if (storeLocation) filters.storeLocation = storeLocation;
  if (purchaseMethod) filters.purchaseMethod = purchaseMethod;
  if (couponUsed) filters.couponUsed = couponUsed === 'true'

  try {
    const sales = await getSalesByComplexFilter(filters);
    if (sales && sales.length > 0) {
      res.json(sales);
    } else {
      res.status(404).json({ message: "Sales not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/top/products", async (req, res) => {
  try {
    const products = await getTop10Products();
    if (products) {
      res.json(products);
    } else {
      res.status(404).json({ message: "Products not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/client/satisfaction/:sort", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  try {
    const clients = await getClientsBySatisfaction(req.params.sort, pageSize, page);
    if (clients) {
      res.json(clients);
    } else {
      res.status(404).json({ message: "Clients not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
