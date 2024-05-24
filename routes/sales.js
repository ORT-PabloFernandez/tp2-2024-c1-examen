import SalesController from "../controllers/SalesController.js";
import express from "express";
import { getAllSales } from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/sale/:id", async (req, res) => {
  try {
    const salesId = req.params.id;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    let saleController = new SalesController();

    let sale = await saleController.findSaleById(salesId, pageSize, page);

    if (sale) {
      res.status(200).json(sale);
    } else {
      res.status(404).json({ message: "Sale not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/locations/:location", async (req, res) => {
  try {
    const location = req.params.location;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    let saleController = new SalesController();

    let salesByLocation = await saleController.getSalesByLocation(
      pageSize,
      page,
      location
    );

    if (salesByLocation) {
      res.status(200).json(salesByLocation);
    } else {
      res.status(404).json({ message: "Location not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get(
  "/salesByLocationAndPurchaseMethod/:location/:purchaseMethod",
  async (req, res) => {
    try {
      const location = req.params.location;
      const purchaseMethod = req.params.purchaseMethod;
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
      const page = req.query.page ? parseInt(req.query.page) : 0;
      const couponUsed = req.query.couponUsed ? req.query.couponUsed : null;

      let couponValue = couponUsed === "true";

      let saleController = new SalesController();

      let salesByLocationAndPurchaseMethod =
        await saleController.getSalesByLocationAndPurchaseMethod(
          pageSize,
          page,
          location,
          purchaseMethod,
          couponValue
        );

      if (salesByLocationAndPurchaseMethod) {
        res.status(200).json(salesByLocationAndPurchaseMethod);
      } else {
        res.status(404).json({ message: "Sales not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
