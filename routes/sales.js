import express from "express";
import {
  getAllSales,
  getSaleById,
  getByStoreLocation,
  getByLocationAndPurchaseMethod,
  getTopTenSoldItems,
  getAllCustomersBySatisfaction,
} from "../data/sales.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/storeLocation/:storeLocation", async (req, res) => {
  const { storeLocation } = req.params;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  res.json(await getByStoreLocation(storeLocation, pageSize, page)); //NOSONAR
});

router.get("/storeLocationAndPurchaseMethod", async (req, res) => {
  const storeLocation = req.query.storeLocation;
  const purchaseMethod = req.query.purchaseMethod;
  const couponUsed = req.query.couponUsed;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  res.json(
    await getByLocationAndPurchaseMethod(
      storeLocation,
      purchaseMethod,
      couponUsed,
      pageSize,
      page
    )
  ); //NOSONAR
});

router.get("/TopTenSoldItems", async (req, res) => {
  res.json(await getTopTenSoldItems()); //NOSONAR
});

router.get("/CustomersBySatisfaction", async (req, res) => {
  res.json(await getAllCustomersBySatisfaction()); //NOSONAR
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await getSaleById(new ObjectId(id))); //NOSONAR
});

export default router;
