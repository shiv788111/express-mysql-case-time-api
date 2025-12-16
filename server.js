import express from "express";
import db from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"

const app = express();
const PORT = 4000;

app.use(express.json());

//api

app.use("/orders",userRoutes)



app.listen(PORT, () => {
  console.log(`server start on port ${PORT}`);
});
