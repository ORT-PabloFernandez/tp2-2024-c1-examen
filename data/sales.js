import { ObjectId } from "mongodb";
import getConnection from "./conn.js";
const DATABASE = "sample_supplies";
const SALES = "sales";

async function getAllSales(pageSize, page) {
    const connectiondb = await getConnection();
    const sales = await connectiondb
        .db(DATABASE)
        .collection(SALES)
        .find({})
        .limit(pageSize)
        .skip(pageSize * page)
        .toArray();
    return sales;
}

const getConnectionMongo = async () => {
    const connectiondb = await getConnection();
    const sales = await connectiondb
        .db(DATABASE)
        .collection(SALES);

    return sales;
};

const getSalesByLocation = async (location, pageSize, page) => {
    try {
        const client = await getConnectionMongo();
        const salesByLocation = await client
            .find({ storeLocation: location })
            .limit(pageSize)
            .skip(pageSize * page)
            .toArray();

        return salesByLocation;
    } catch (error) {
        console.error(error);
    }
};

const getSalesByPurchaseMethod = async (method, pageSize, page) => {
    try {
        const client = await getConnectionMongo();
        const salesByPurchaseMethod = await client
            .find({
                couponUsed: true,
                purchaseMethod: method,
            })
            .limit(pageSize)
            .skip(pageSize * page)
            .toArray();

        return salesByPurchaseMethod;
    } catch (error) {
        console.error(error);
    }
};

const getSalesBestSellers = async () => {
    try {
        const client = await getConnectionMongo();
        const sales = await client.find({}).toArray();

        const productCounts = {};

        for (let i = 0; i < sales.length; i++) {
            const items = sales[i].items;

            for (let j = 0; j < items.length; j++) {
                const item = items[j];

                if (productCounts[item.name]) {
                    productCounts[item.name] += item.quantity;
                } else {
                    productCounts[item.name] = item.quantity;
                }
            }
        }

        const productArray = Object.keys(productCounts).map((name) => ({
            name,
            quantity: productCounts[name]
        }));

        const bestSellers = productArray.sort((a, b) => b.quantity - a.quantity).slice(0, 10);

        return bestSellers;
    } catch (error) {
        console.error(error);
    }
};

const getSalesByCustomerLessSatisfaction = async (pageSize, page) => {
    try {
        const client = await getConnectionMongo();
        const customerLessSatisfaction = await client
            .find({})
            .sort({ "customer.satisfaction": 1 }) //A->Z orden ascendente
            .limit(pageSize)
            .skip(pageSize * page)
            .toArray();

        return customerLessSatisfaction;
    } catch (error) {
        console.error(error);
    }
};

const getSalesById = async (salesId) => {
    try {
        const client = await getConnectionMongo();
        const salesById = await client.findOne({ _id: new ObjectId(salesId) });
        return salesById;
    } catch (error) {
        console.error(error);
    }
};

export {
    getAllSales,
    getSalesById,
    getSalesByLocation,
    getSalesByPurchaseMethod,
    getSalesBestSellers,
    getSalesByCustomerLessSatisfaction 
};
