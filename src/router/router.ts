import Router, { Express } from "express";
import Controller from "../controller/controller";

const router: Express = Router();

router.get('getOrders', Controller.getOrders);
router.get('getMatchingOrders', Controller.getOrders);

export default router;

