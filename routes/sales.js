import express from "express";
import {
  getAllSales,
  getSale,
  getSalesByLocation,
  getSalesByFilter,
  getSatisfactionOrden,
} from "../data/sales.js";

const router = express.Router();
router.get("/:id", async (req, res) => {
  try {
    const sale = await getSale(req.params.id);
    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/StoreLocation/:location", async (req, res) => {
  const location = req.params.location;
  try {
    const sales = await getSalesByLocation(location);
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get(async (req, res) => {
  const { location } = req.params;
  const { medio, cupon } = req.query;
  try {
    const sales = await getSalesByFilter(location, medio, cupon);

    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/customer/satisfactionOrden", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 100;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const customer = await getSatisfactionOrden(pageSize, page);
  res.json(customer);
});

export default router;
