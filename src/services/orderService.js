import * as OrderRepo from '../repositories/orderRepo.js';

export async function getOrdersService(page = 0, limit = 100) {
  return OrderRepo.getAllOrders(page, limit);
}

export async function getOrderService(id) {
  return OrderRepo.findOrderById(id);
}

export async function createOrderService(data) {
  return OrderRepo.createOrder(data);
}

export async function updateOrderStatusService(id, status) {
  return OrderRepo.updateOrder(id, { status });
}

export async function deleteOrderService(id) {
  return OrderRepo.deleteOrder(id);
}