import express from "express";
import { getAllSales, getSaleById, getSalesByLocation, getSalesByLocationPurchaseMethodAndCouponUsed, getMostBoughtItems, getCustomersBySatisfaction } from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/location", async (req, res) => {
  const storeLocation = req.query.storeLocation;
  res.json(await getSalesByLocation(storeLocation));
});

router.get("/customSearch", async (req, res) => {
  const { storeLocation, purchaseMethod } = req.query;
  const couponUsed = req.query.couponUsed.toLowerCase() === 'true' ? true : false;
  res.json(await getSalesByLocationPurchaseMethodAndCouponUsed(storeLocation, purchaseMethod, couponUsed));
});

router.get("/mostBought", async (req, res) => {
  res.json(await getMostBoughtItems());
});

router.get("/customers/satisfaction", async (req, res) => {
  res.json(await getCustomersBySatisfaction());
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  res.json(await getSaleById(id));
});


export default router;
