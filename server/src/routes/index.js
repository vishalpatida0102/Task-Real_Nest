import { Router } from "express";
import projectRoutes from "./projectRoutes.js";
import clientRoutes from "./clientRoutes.js";
import contactRoutes from "./contactRoutes.js";
import subscriberRoutes from "./subscriberRoutes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

router.use("/projects", projectRoutes);
router.use("/clients", clientRoutes);
router.use("/contacts", contactRoutes);
router.use("/subscribers", subscriberRoutes);

export default router;

