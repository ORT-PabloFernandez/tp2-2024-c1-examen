import express from "express";
import {
  getAllSales,
  findSale,
  getSaleByLocation,
  getSalesByLocMethCoup,
  getBestSellers,
  getClientsBySatisfaction,
} from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/location/:location", async (req, res) => {
  const sales = await getSaleByLocation(req.params.location.toLowerCase());

  res.json(sales);
});

router.get("/locMethCoup", async (req, res) => {
  const location = req.query.location.toLowerCase();
  const paymentMethod = req.query.paymentMethod.toLowerCase();
  const coupon = req.query.coupon.toLowerCase();

  const sales = await getSalesByLocMethCoup(location, paymentMethod, coupon);

  res.json(sales);
});

router.get("/bestSellers", async (req, res) => {
  const bestSellers = await getBestSellers();

  res.json(bestSellers);
});

router.get("/satisfaction", async (req, res) => {
  const clients = await getClientsBySatisfaction();

  res.json(clients);
});

router.get("/:_id", async (req, res) => {
  const sale = await findSale(req.params._id);

  res.json(sale);
});

export default router;
