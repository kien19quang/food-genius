import ApiClient from "../../configs/axiosConfig";


class CategoryRepository {
  async getListCategory () {
    const categories = await ApiClient.GET('/category')
    console.log(categories)
    return categories
  }
}

export default new CategoryRepository();
