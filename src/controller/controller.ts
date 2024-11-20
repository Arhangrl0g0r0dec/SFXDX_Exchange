import { Request, Response } from "express";
import { GetOrder, GetMatchingOrders } from "../config/models/requestModels";
import { RequestWithBody } from "../config/models/types";
import Service from "../servise/Service";

class Controller {
    async getOrders(req: RequestWithBody<GetOrder>, res: Response) {
        const data: GetOrder = {
            tokenA: req.body.tokenA,
            tokenB: req.body.tokenB,
            user: req.body.user,
            acttive: req.body.acttive ?? false
        }
        const result: number = await Service.getOrders(data);
    }

    async getMatchingOrders(req: RequestWithBody<GetMatchingOrders>, res: Response) {
        const data: GetMatchingOrders = {
            tokenA: req.body.tokenA,
            tokenB: req.body.tokenB,
            amountA: req.body.amountA,
            amountB: req.body.amountB
        }
        const result: number = await Service.getMatchingOrders(data);
    }
}

export default new Controller();