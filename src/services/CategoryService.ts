import ApiClient from "../configs/axiosConfig";

class CategoryService {
  async getListCategory () {
    const categories = await ApiClient.GET('/category')
    return categories
  }
}

export default new CategoryService();
