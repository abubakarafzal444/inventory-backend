import { createConnection } from "typeorm";
import { Request, Response, NextFunction } from "express";
import { Product } from "./src/Entities/Product";

const express = require("express");
const bodyParser = require("body-parser");

const productsRoutes = require("./src/routes/products");

const app = express();
const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 6000,
      username: "postgres",
      password: "bcsf20m538",
      database: "inventory",
      entities: [Product],
      synchronize: true,
    });
    console.log("connected to postgres");
    app.listen(8080, () => console.log("running on port 8080"));
  } catch {
    console.log("connection failed");
  }
};
main();

app.use(bodyParser.json());

app.use((req: Request, res: any, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "Authorization"
  );
  next();
});

app.use(productsRoutes);
