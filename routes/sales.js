import express from "express";
import {
  getAllSales,
  getSaleById,
  getSaleByLocation,
  getSalesFiltered,
  getTop10Productos,
} from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("consultando API: a");

  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/byId/:id", async (req, res) => {
  console.log("consultando API: VENTA POR ID");

  try {
    const sale = await getSaleById(req.params.id);
    res.json(sale);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.get("/location/:location", async (req, res) => {
  console.log("consultando API: VENTAS POR LOCATION");

  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  try {
    const salesByLocation = await getSaleByLocation(
      req.params.location,
      pageSize,
      page
    );
    res.json(salesByLocation);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.get("/filtered", async (req, res) => {
  console.log("consultando API: VENTAS FILTRADAS");

  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const { location, purchaseMethod, couponUsed } = req.query;

  try {
    const salesFiltered = await getSalesFiltered(
      location,
      purchaseMethod,
      couponUsed,
      pageSize,
      page
    );
    res.json(salesFiltered);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.get("/top10", async (req, res) => {
  console.log("consultando API: TOP 10 PRODUCTOS");

  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  try {
    const p = await getTop10Productos(pageSize, page);
    res.json(p);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

export default router;
