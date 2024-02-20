import ApiClient from "../configs/axiosConfig";

class PaymentService {
  async createPaymentIntents (amount: number) {
    const paymentIntent = await ApiClient.POST('/payment/intents', { amount: amount })
    return paymentIntent
  }

  async deleteTransaction(id: string) {
    const response = await ApiClient.DELETE(`/payment/${id}`)
    console.log(response)
    return response
  }
}

export default new PaymentService();
