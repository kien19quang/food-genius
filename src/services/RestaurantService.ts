import ApiClient from "../configs/axiosConfig";

class RestaurantService {
  async getListFeatured (categoryId: string) {
    let url = '/restaurant/featured';
    if (categoryId !== 'all') {
      url += `?categoryId=${categoryId}`
    }
    const listFeatureds = await ApiClient.GET(url)
    return listFeatureds
  }

  getDetailRestaurant = async (id: string) => {
    const restaurant = await ApiClient.GET(`/restaurant/${id}`)
    return restaurant
  }
}

export default new RestaurantService();
