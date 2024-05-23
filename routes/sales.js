import express from "express";
import { getAllSales, getSalebyId, getSalesByLocation } from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  //console.log(id);
  try {
    const sale = await getSalebyId(id);
    if (sale) {
      res.json(sale);
    } else {
      res.status(404).json({ message: "No Existe Venta." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
});

router.get("/location/:location", async (req, res) => {
  const location = req.params.location;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  try {
    res.json(await getSalesByLocation(location, pageSize, page));
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
});

export default router;
