import { Authenticate } from "../middlewares/Authenticate";
import { RoleAuthentication } from "../middlewares/Authenticate";
import { Router } from "express";
import { loginUser, addUser } from "../controllers/User";
import validateAddUser from "../validators/add-user-validator";
import validateLogin from "../validators/login-validator";
const router = Router();

//POST ./add-user
router.post(
  "/add-user",
  // Authenticate,
  //RoleAuthentication,
  validateAddUser,
  addUser
);

router.post("/login", validateLogin, loginUser);

export { router as UserRoutes };
