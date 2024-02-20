import ApiClient from "../configs/axiosConfig";

class RestaurantService {
  async getListFeatured () {
    const listFeatureds = await ApiClient.GET('/restaurant/featured')
    return listFeatureds
  }

  getDetailRestaurant = async (id: string) => {
    const restaurant = await ApiClient.GET(`/restaurant/${id}`)
    return restaurant
  }
}

export default new RestaurantService();
