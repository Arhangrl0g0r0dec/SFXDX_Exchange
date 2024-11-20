import { GetOrder, GetMatchingOrders } from "../config/models/requestModels";

class Sevice {
    async getOrders(data: GetOrder): Promise<number> {
        return 1;
    }

    async getMatchingOrders(data: GetMatchingOrders): Promise<number> {
        return 1;
    }
}

export default new Sevice();