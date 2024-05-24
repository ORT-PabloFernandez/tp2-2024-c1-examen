import "dotenv/config";
import express from "express";
import moviesRouter from "./routes/movies.js";
import salesRouter from "./routes/sales.js";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use("/api/sales", salesRouter);
app.use("/api/movies", moviesRouter);

app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`);
});
