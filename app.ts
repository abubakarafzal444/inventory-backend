import { createConnection } from "typeorm";
import { Request, Response, NextFunction } from "express";
import { User } from "./src/Entities/User";
import { Tile } from "./src/Entities/Tile";
import { Grout } from "./src/Entities/Grout";
import { AllGroutRoute } from "./src/routes/Grout";
import { AllTilesRoute } from "./src/routes/Tiles";
import { AllProductsRoute } from "./src/routes/products";
import { UserRoutes } from "./src/routes/User";
import express from "express";
import bodyParser from "body-parser";
import multerMiddleware from "./src/middlewares/multer-config";
import { Role } from "./src/Entities/Role";

const app = express();

//connecting to database
let connection;
const main = async () => {
  try {
    connection = await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "bcsf20m538",
      database: "inventory",
      entities: [User, Role, Tile, Grout],
      synchronize: true,
    });
    console.log("connected to postgres");
    app.listen(9000, () => console.log("running on port 9000"));
  } catch {
    console.log("connection failed");
  }
};
main();

//setting headers for CORS (Cross server resource share)

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
    "Access-Control-Allow-Headers, Content-Type,Authorization"
  );
  next();
});

//body-parser middleware
app.use(bodyParser.json());

//multer for file parsing
app.use(multerMiddleware);

//app or api routes
app.use(AllProductsRoute);
app.use(AllTilesRoute);
app.use(AllGroutRoute);
app.use(UserRoutes);
export { connection };

// getConnection()
// .createQueryBuilder()
// .select("user")
// .from(User, "user")
// .leftJoinAndSelect("user.role", "Role")
// .where("user.UserName = :UserName", { UserName: req.body.UserName })
// .getOne();
