import { Router } from "express";
import { RegionController } from "../controllers/RegionController";

const router = Router();

router.get("/regions", RegionController.list);
router.post("/regions", RegionController.create);
router.put("/regions/:id", RegionController.update);
router.delete("/regions/:id", RegionController.delete);
router.get("/regions/:id", RegionController.show);
router.get("/regions/containd", RegionController.show);
router.get("/regions/nearby", RegionController.findRegionsNearPoint);
router.get("/regions/containing-point", RegionController.findRegionsContainingPoint);

export default router;
