import prisma from '../config/db.js';

export async function createItem(data) {
  return prisma.item.create({ data });
}

export async function findItemById(id) {
  return prisma.item.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      createdAt: true,

      category: {
        select: {
          id: true,
          name: true,
        }
      },

      seller: {
        select: {
          id: true,
          username: true,
          role: true,
        }
      },

      reviews: {
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          reviewer: {
            select: {
              id: true,
              username: true
            }
          }
        }
      }
    }
  });
}

export async function getAllItems(skip = 0, take = 50) {
  return prisma.item.findMany({
    skip,
    take,
    orderBy: { createdAt: 'desc' },
    include: { seller: { select: { id: true, username: true } } },
  });
}

export async function updateItem(id, data) {
  return prisma.item.update({ where: { id: Number(id) }, data });
}

export async function deleteItem(id) {
  return prisma.item.delete({ where: { id: Number(id) } });
}

export async function getItemsBySeller(sellerId) {
  return prisma.item.findMany({
    where: { sellerId: Number(sellerId) },
    include: { category: true },
  });
}

export async function getItemsByCategory(categoryId) {
  return prisma.item.findMany({
    where: { categoryId: Number(categoryId) },
    include: { seller: { select: { id: true, username: true } } },
  });
}

export async function searchItemsByName(q) {
  return prisma.item.findMany({
    where: { name: { contains: q, mode: 'insensitive' } },
    include: { seller: { select: { id: true, username: true } } },
    take: 20,
  });
}
export async function getItemReviews(itemId) {
  return prisma.review.findMany({
    where: { itemId: Number(itemId) },
    include: { reviewer: { select: { id: true, username: true } } },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getItemAverageRating(itemId) {
  const agg = await prisma.review.aggregate({
    where: { itemId: Number(itemId) },
    _avg: { rating: true },
    _count: { rating: true },
  });
  return { average: agg._avg.rating, count: agg._count.rating };
}