import ApiClient from "../configs/axiosConfig";
import { LoginDto, RegisterDto } from "../interfaces/common";

class AuthService {
  async registerCustomer (data: RegisterDto) {
    const customer = await ApiClient.POST('/auth/customer/register', data)
    return customer
  }

  async loginCustomer (data: LoginDto) {
    const customer = await ApiClient.POST('/auth/customer/login', data)
    return customer
  }
}

export default new AuthService();
