import prisma from '../config/db.js';

//Basic CRUD
export async function createReview(data) {
  return prisma.review.create({ data });
}

export async function findReviewById(id) {
  return prisma.review.findUnique({
    where: { id: Number(id) },
    include: { reviewer: true, item: true },
  });
}

export async function updateReview(id, data) {
  return prisma.review.update({ where: { id: Number(id) }, data });
}

export async function deleteReview(id) {
  return prisma.review.delete({ where: { id: Number(id) } });
}

//By username
export async function getReviewsByUsername(username) {
  return prisma.review.findMany({
    where: { reviewer: { username } },
    include: {
      item: { select: { id: true, name: true } },
      reviewer: { select: { id: true, username: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

//by Item
export async function getReviewsByItem(itemId) {
  return prisma.review.findMany({
    where: { itemId: Number(itemId) },
    include: { reviewer: { select: { id: true, username: true } } },
    orderBy: { createdAt: 'desc' },
  });
}

//Seeing reviews
export async function getItemReviewStats(itemId) {
  return prisma.review.groupBy({
    by: ['rating'],
    where: { itemId: Number(itemId) },
    _count: { rating: true },
  });
}

//By user
export async function getReviewsWrittenByUser(userId) {
  return prisma.review.findMany({
    where: { reviewerId: Number(userId) },
    include: { item: { select: { id: true, name: true } } },
    orderBy: { createdAt: 'desc' },
  });
}

export async function countReviewsByUser(userId) {
  return prisma.review.count({ where: { reviewerId: Number(userId) } });
}