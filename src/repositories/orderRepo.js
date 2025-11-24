import prisma from '../config/db.js';

export async function createOrder(data) {
  const { itemId, quantity, totalPrice, paymentMethod, buyerId } = data;

  // Find the item first to get the sellerId
  const item = await prisma.item.findUnique({
    where: { id: Number(itemId) },
  });

  if (!item) {
    const err = new Error("Item not found");
    err.status = 404;
    throw err;
  }

  return prisma.order.create({
    data: {
      quantity: Number(quantity),
      totalPrice: Number(totalPrice),
      paymentMethod,
      item: { connect: { id: Number(itemId) } },
      buyer: { connect: { id: Number(buyerId) } },
      seller: { connect: { id: Number(item.sellerId) } }, 
    },
  });
}

export async function findOrderById(id) {
  return prisma.order.findUnique({
    where: { id: Number(id) },
    include: { item: true, buyer: true, seller: true },
  });
}

export async function getAllOrders(skip = 0, take = 50) {
  return prisma.order.findMany({
    skip,
    take,
    orderBy: { createdAt: 'desc' },
    include: {
      item: { select: { id: true, name: true, price: true } },
      buyer: { select: { id: true, username: true } },
      seller: { select: { id: true, username: true } },
    },
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