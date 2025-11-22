import prisma from '../config/db.js';

export async function createOrder(data) {
  return prisma.order.create({ data });
}

export async function findOrderById(id) {
  return prisma.order.findUnique({
    where: { id: Number(id) },
    include: { item: true, buyer: true, seller: true },
  });
}

export async function getAllOrders(skip = 0, take = 100) {
  return prisma.order.findMany({
    skip,
    take,
    orderBy: { createdAt: 'desc' },
    include: { item: true, buyer: true, seller: true },
  });
}

export async function updateOrder(id, data) {
  return prisma.order.update({ where: { id: Number(id) }, data });
}

export async function deleteOrder(id) {
  return prisma.order.delete({ where: { id: Number(id) } });
}

//User based queries
export async function getOrdersByBuyer(buyerId) {
  return prisma.order.findMany({
    where: { buyerId: Number(buyerId) },
    include: { item: true, seller: true },
  });
}

export async function getOrdersBySeller(sellerId) {
  return prisma.order.findMany({
    where: { sellerId: Number(sellerId) },
    include: { item: true, buyer: true },
  });
}

//Status based queries
export async function getOrdersByStatus(status) {
  return prisma.order.findMany({
    where: { status },
    include: { item: true, buyer: true, seller: true },
  });
}