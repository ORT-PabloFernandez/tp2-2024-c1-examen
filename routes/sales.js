import express from "express";
import { getAllSales,getSalesLocation,getAllItems, getAllCustomers,getSale} from "../data/sales.js";

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

router.get('/storeLocation/:location', async (req, res) => {
  try {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const location = req.params.location;
  res.json(await getSalesLocation(pageSize, page, location));
} catch (error) {
  res.status(500).json({ message: 'Error al obtener las locaciones' });
}
});

router.get("/items", async (req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;
  res.json(await getAllItems(pageSize, page));
} catch (error) {
  res.status(500).json({ message: 'Error al obtener los productos mas vendidos' });
}
});

router.get("/customers", async (req, res) => {
  try {
  res.json(await getAllCustomers());
} catch (error) {
  res.status(500).json({ message: 'Error al obtener las satisfacciones de los clientes' });
}
});

export default router;
