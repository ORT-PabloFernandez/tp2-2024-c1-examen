import express from "express";
import { getAllSales, getSalesByLocation, getById, getMasVendidos, getPorFiltrado } from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});


//ruta ejercicio1
//ruta -GET /api/sales/:id=[Id]
router.get("/:id", async (req,res) =>
  {
    try{
      const id = req.query.id;
      res.json(await getById(id));
    }catch(error){
      res.status(500).send({message: 'Error filtrando las peliculas.'})
    }
  });

  //ruta ejercicio2
  // -GET /api/sales/locacion?location=[Locacion]
  router.get("/locacion", async(req,res) =>{
    try{
      const location = req.params.location;
      res.json(await getSalesByLocation(location));
    }catch(error){
      res.status(500).send({message: 'Error filtrando las peliculas.'})
    }
  });

//ruta ejericico 3
// ruta -GET /api/sales/maxVentas
router.get("/maxVentas", async(req,res) =>
{
  try{
    res.json(await getMasVendidos());
  }catch(error){
    res.status(500).send({message: 'Error filtrando las peliculas.'})
  }
});

//router ejercicio4
// ruta -GET /api/sales/filtrado?location=[locacion]&metodo=[metodo]
router.get("/filtrado", async(req, res)=> {
  try{
      const location = req.body.location;
      const metodo = req.body.metodo;
      res.json(await getPorFiltrado(location, metodo));
  }catch(error){
    res.status(500).send({message: 'Error filtrando las peliculas.'})
  }
});

export default router;
