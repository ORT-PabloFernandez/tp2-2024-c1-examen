import express from "express";
import { getAllSales, getSaleById, getSalesByStoreLocation, getMostSelledProducts, getCustomersOrderBySatisfaction } from "../data/sales.js";

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
      res.status(404).json({ message: "Venta no encontrada" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/location/:storeLocation", async (req, res) => {
  const purchaseMethod = req.query.purchaseMethod;
  const couponUsed = req.query.couponUsed === 'true';
  console.log(couponUsed);
  try {
    const sales = await getSalesByStoreLocation(req.params.storeLocation, purchaseMethod, couponUsed);
    if (sales){
      res.json(sales);
    } else {
      res.status(404).json({ message: "La tienda buscada no posee ventas" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/products/mostSelledProducts", async (req, res) => {
  res.json(await getMostSelledProducts());
});

router.get("/customers/orderBySatisfaction", async (req, res) => {
  res.json(await getCustomersOrderBySatisfaction());
});



export default router;
