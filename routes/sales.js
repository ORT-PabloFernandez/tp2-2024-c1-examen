import express from "express";
import { getAllSales, getSaleById, getSalesByLocation, getSalesByLocationPurchaseAndCupon, getTopProducts, getSalesBySatisfaction} from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/topProducts", async (req, res) => {
  let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
  let page = req.query.page ? parseInt(req.query.page) : 1;

  // Validar que pageSize y page sean números enteros
  if (isNaN(pageSize) || isNaN(page)) {
    return res.status(400).json({ error: "pageSize and page must be integers." });
  }

  try {
    const topProducts = await getTopProducts(pageSize, page);
    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});


router.get("/satisfaction", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  try {
    const sales = await getSalesBySatisfaction(pageSize, page);
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Sales by ID
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

//Sales by Location
router.get("/location/:location", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  try {
    const sales = await getSalesByLocation(pageSize, page, req.params.location);
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//Sales by storeLocation, purchaseMethod and couponUsed

router.post("/locationPurchaseCupon", async (req, res) => {
  const { storeLocation, purchaseMethod, couponUsed, pageSize = 0, page = 0 } = req.body;
  try {
    if (typeof couponUsed !== 'boolean') {
      throw new Error('couponUsed must be a boolean value');
    }
    const sales = await getSalesByLocationPurchaseAndCupon(
      parseInt(pageSize),
      parseInt(page),
      storeLocation,
      purchaseMethod,
      Boolean(couponUsed)
    );
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
