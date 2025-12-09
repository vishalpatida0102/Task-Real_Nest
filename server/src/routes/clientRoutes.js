import { Router } from "express";
import { createClient, getClients } from "../controllers/clientController.js";

const router = Router();

router.get("/", getClients);
router.post("/", createClient);

export default router;

