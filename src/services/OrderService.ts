import ApiClient from "../configs/axiosConfig";
import { OrderDto } from "../interfaces/common";

class OrderService {
  async createOrder (data: OrderDto) {
    const order = await ApiClient.POST('/order', data)
    return order
  }
}

export default new OrderService();
