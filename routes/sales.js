import express from "express";
import { getAllSales, getSaleById, getSalesByLocation, getSalesFilteredByLocPurMethodAndCoup, getTopSales, getClientsBySatisfaction } from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 100;
  const page = req.query.page ? parseInt(req.query.page) : 1;

  res.json(await getAllSales(pageSize, page));
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sale = await getSaleById(id)

    if (!sale) {
      res.status(404).send({ message: "Sale not found" })
    }

    res.json(sale)

  } catch (e) {
    res.status(404).send({ message: e.message })
  }
})

router.get("/location/:loc", async (req, res) => {
  try {
    const loc = req.params.loc;
    const salesLoc = await getSalesByLocation(loc);
    res.json(salesLoc)
  } catch (e) {
    res.status(404).send({ message: e.message })
  }
})

router.get("/data", async (req, res) => {
  const storeLocation = req.query.storeLocation ? String(req.query.storeLocation) : "Seattle";
  const purchaseMethod = req.query.purchaseMethod ? String(req.query.purchaseMethod) : "Online";
  const couponUsed = req.query.couponUsed ? true : false;

  const salesFiltered = await getSalesFilteredByLocPurMethodAndCoup(storeLocation, purchaseMethod, couponUsed);
  res.json(salesFiltered);
});

router.get('/top', async (req, res) => {
  try {
    res.json(await getTopSales())
  } catch (e) {
    res.status(404).send({ message: e.message })
  }

})

router.get('/satisfaction', async (req, res) => {
  try {
    res.json(await getClientsBySatisfaction())
  } catch (e) {
    res.status(404).send({ message: e.message })
  }

})

export default router;
