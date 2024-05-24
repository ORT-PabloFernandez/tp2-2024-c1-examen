import express from "express";
import { getAllSales, getSaleById, getSalesByLocation, getSalesFilteredByLocPurMethodAndCoup, getTopSales, getClientsBySatisfaction } from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 1;
  const page = req.query.page ? parseInt(req.query.page) : 100;

  res.json(await getAllSales(pageSize, page));
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sale = await getSaleById(id)
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
  try {
    const { storeLocation, purchaseMethod, couponUsed } = req.query;

    console.log('storeLocation:', storeLocation);
    console.log('purchaseMethod:', purchaseMethod);
    console.log('couponUsed:', couponUsed);

    if (!storeLocation || !purchaseMethod || couponUsed === undefined) {
      return res.status(400).send({ message: "Missing required parameters" });
    }

    const isCouponUsed = couponUsed.toLowerCase() === 'true';

    const salesFiltered = await getSalesFilteredByLocPurMethodAndCoup(storeLocation, purchaseMethod, isCouponUsed);
    res.json(salesFiltered)
  } catch (e) {
    res.status(404).send({ message: e.message })
    throw e;
  }
})

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
