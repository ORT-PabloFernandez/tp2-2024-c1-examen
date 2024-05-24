import express from "express";
import { getAllSales, getSalesBestSellers, getSalesByCustomerLessSatisfaction, getSalesById, getSalesByLocation, getSalesByPurchaseMethod } from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    res.json(await getAllSales(pageSize, page));
});

const getPages = ({ pageSize, page }) => {
    pageSize = pageSize ? parseInt(pageSize) : 10;
    page = page ? parseInt(page) : 0;

    return { pageSize, page };
}

router.get("/location", async (req, res) => {
    try {
        const { location } = req.query;
        const { pageSize, page } = getPages(req.query);
        const salesLocation = await getSalesByLocation(location, pageSize, page);

        return res.status(200).json(salesLocation);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/best-sellers", async (_req, res) => {
    try {
        const salesBestSellers = await getSalesBestSellers();

        return res.status(200).json(salesBestSellers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/customer-satisfaction", async (req, res) => {
    try {
        const { pageSize, page } = getPages(req.query);
        const customerSatisfaction = await getSalesByCustomerLessSatisfaction(pageSize, page);

        return res.status(200).json(customerSatisfaction);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/method", async (req, res) => {
    try {
        const { method } = req.query;
        const { pageSize, page } = getPages(req.query);
        const salesPurchase = await getSalesByPurchaseMethod(method, pageSize, page);

        return res.status(200).json(salesPurchase);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const salesId = await getSalesById(id);
        return res.status(200).json(salesId);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router;
