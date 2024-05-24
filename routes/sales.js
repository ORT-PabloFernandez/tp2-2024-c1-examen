import express, { Router, query } from "express";
import { 
  getAllSales,
  getSale,
  getSalesLocation
} from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/:id", async (req, res) => {
  const sale = await getSale(req.params.id);
  res.json(sale);
});

router.get("/:storeLocation", async (req, res) => {
  const salesLocation = await getSalesLocation(req.params.id);
  res.json(salesLocation);
});

router.get("/salesFiltrados", async (req, res) => {
  const {storeLocation, purchaseMethod, couponUsed} = req.query;
  const query = {};
  if (storeLocation) query.storeLocation = storeLocation;
  if (purchaseMethod) query.purchaseMethod = purchaseMethod;
  if (couponUsed) query.couponUsed = couponUsed;

  try{
    const sales = await getAllSales.find(query);
    if (sales.length === 0){
      return res.status(404).json({message : "No se encontraron ventas que coincidan"})
    }
    res.json(sales);

  }catch (err){
    console.error("Error al buscar ventas con filtros: ", err);
    res.status(500).json({message: "Error interno del servidor."});
  }

});

export default router;
