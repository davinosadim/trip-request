import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { validate } from "../middlewares/validationsMiddleware";
import { createUserSchema } from "../utils/userValidation";

const router = Router();
const userController = new UserController();

router.post("/users", validate(createUserSchema), userController.create);

router.get("/", userController.findAll);

router.get("/:id", userController.findById);

export default router;
