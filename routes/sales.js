import express from "express"
import { 
  getAllSales,
  getSale,
  getSaleByLocation,
  getFilterSales,
  getTenSales,
  getCustomersBySatisfaction
} from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});
router.get('/location/:storeLocation', async (req, res) => {
  try {
    const location = await getSaleByLocation(req.params.storeLocation);
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/filter', async (req, res) => {
  try {
    const { storeLocation, purchaseMethod, couponUsed } = req.query;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const page = parseInt(req.query.page) || 0;
    const couponUsedBoolean = couponUsed === 'true' || 'false';
    const sales = await getFilterSales(storeLocation, purchaseMethod, couponUsed, pageSize, page);
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/top-ten', async (req, res) => {
  try {
    const topTen = await getTenSales();
    res.json(topTen);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/customers-satisfaction', async (req, res) => {
  const {order} = req.query;
  try {
    const customers = await getCustomersBySatisfaction(order);
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const sale = await getSale(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    res.json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
