import express from "express";
import { getAllSales,getSalesById, getSalesByStoreLocation, getSalesByFilter,getTopItems,getCustomersSortedBySatisfaction} from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/:id", async (req, res) => {
  res.json(await getSalesById(req.params.id));
});

router.get("/storeLocation/:storeLocation", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  res.json(await getSalesByStoreLocation(pageSize, page, req.params.storeLocation));
});

router.get("/filter/:filter", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  res.json(await getSalesByFilter(pageSize, page,req.params.storeLocation, req.params.purchaseMethod, req.params.couponUsed));

});

router.get("/topItems", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
    res.json(await getTopItems(pageSize, page));

});
router.get("/satisfaction", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  
  res.json(await getCustomersSortedBySatisfaction(pageSize,page));
});

export default router;
