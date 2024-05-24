import "dotenv/config";
import express from "express";
import moviesRouter from "./routes/movies.js";
import salesRouter from "./routes/sales.js";

/*
Comentarios base para dev -->
1 -ejecutar en terminal comandos:
 npm install
 npm install mongodb
 
2- ejecutar la consola en nodejs
3- ejecutar comando en terminal npm start 
*/


const PORT = 3000; //process.env.PORT;
const app = express();
app.use(express.json());
app.use("/api/sales", salesRouter);
app.use("/api/movies", moviesRouter);

app.listen(PORT, () => {
  console.log("Servidor Web en el puerto:", PORT);
});
