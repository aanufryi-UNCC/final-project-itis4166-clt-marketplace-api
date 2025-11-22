import {
  getOrdersService,
  getOrderService,
  createOrderService,
  updateOrderStatusService,
  deleteOrderService
} from '../services/orderService.js';

export async function getOrdersHandler(req, res, next) {
  try {
    const page  = Number(req.query.page)  || 0;
    const limit = Number(req.query.limit) || 100;
    const orders = await getOrdersService(page, limit);
    res.json(orders);
  } catch (e) { next(e); }
}

export async function getOrderHandler(req, res, next) {
  try {
    const order = await getOrderService(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (e) { next(e); }
}

export async function createOrderHandler(req, res, next) {
  try {
    const order = await createOrderService({ ...req.body, buyerId: req.user.id });
    res.status(201).json(order);
  } catch (e) { next(e); }
}

export async function updateOrderHandler(req, res, next) {
  try {
    const updated = await updateOrderStatusService(req.params.id, req.body.status);
    res.json(updated);
  } catch (e) { next(e); }
}

export async function deleteOrderHandler(req, res, next) {
  try {
    await deleteOrderService(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (e) { next(e); }
}