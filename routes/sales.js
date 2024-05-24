import express from "express";
import { getAllSales, getSaleById , getBestSales , getSalesByLocationPurchaseMethodCouponUsed, getSalesByLocation} from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/byId/:id", async (req, res) => {
  try{
    const Sale = await getSaleById(req.params.id)
    if(Sale){
      res.json(Sale)
    }else{
      res.status(404).json({message:"venta no existe"})
    }
  }catch(error)
{
  res.status(400).json({message:error.message})
}
});

router.get("/location/:location", async (req, res) => {
  try {
    const sales = await getSalesByLocation(req.params.location);
    if (sales) {
      res.json(sales);
    } else {
      res.status(404).json({ message: "Venta sin esta locacion" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getSaleByLocationAndPurchaseMethodAndCouponUsed", async (req, res) => {
  const location = req.query.location;
  const purchaseMethod = req.query.purchaseMethod;
  const couponUsed = req.query.couponUsed === 'true';
  
  
  res.json(await getSalesByLocationPurchaseMethodCouponUsed(location, purchaseMethod, couponUsed));
});

router.get("/getBestSales", async (req, res) => {
  res.json(await getBestSales());
});

router.get("/getBestSales", async (req, res) => {
  res.json(await getBestSales());
});

export default router;
