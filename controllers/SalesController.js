import { getAllSales } from "../data/sales.js";
import { getSalesByLocation } from "../data/sales.js";
import { getSalesByLocationAndPurchaseMethod } from "../data/sales.js";

export default class SalesController {
  async findSaleById(id, pageSize, page) {
    try {
      let sales = await getAllSales(pageSize, page);
      let saleSearched = null;

      sales.forEach((sale) => {
        if (sale._id.toString() == id) {
          saleSearched = sale;
        }
      });

      return saleSearched;
    } catch (error) {
      console.error("Error al obtener venta por id : ", error);
    }
  }

  async getSalesByLocation(pageSize, page, location) {
    try {
      let salesByLocation = await getSalesByLocation(pageSize, page, location);

      return salesByLocation;
    } catch (error) {
      console.log("Error al obtener ventas por localidad : ", error);
    }
  }

  async getSalesByLocationAndPurchaseMethod(
    pageSize,
    page,
    location,
    purchaseMethod,
    couponValue
  ) {
    try {
      let salesByLocationAndPurchaseMethod =
        await getSalesByLocationAndPurchaseMethod(
          pageSize,
          page,
          location,
          purchaseMethod,
          couponValue
        );

      let salesByLocationAndPurchaseMethodAndCouponUsed = [];

      salesByLocationAndPurchaseMethod.forEach((sale) => {
        console.log(couponValue);
        if (sale.couponUsed === couponValue) {
          salesByLocationAndPurchaseMethodAndCouponUsed.push(sale);
        }
      });

      return salesByLocationAndPurchaseMethodAndCouponUsed;
    } catch (error) {
      console.log(
        "Error al obtener ventas por localidad y método de pago : ",
        error
      );
    }
  }

}
