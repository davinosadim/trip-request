import { Router } from "express";
import { TravelRequestController } from "../controllers/TravelRequestController";
import { validate } from "../middlewares/validationsMiddleware";
import { createTravelRequestSchema } from "../utils/travelRequestValidation";

const router = Router()
const travelRequestController = new TravelRequestController()

router.post("/request", validate(createTravelRequestSchema), travelRequestController.createRequest);

export default router
