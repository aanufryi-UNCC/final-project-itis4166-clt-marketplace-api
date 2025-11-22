import prisma from '../config/db.js';

export async function createCategory(data) {
  return prisma.category.create({ data });
}

export async function findCategoryById(id) {
  return prisma.category.findUnique({ where: { id: Number(id) } });
}

export async function findCategoryByName(name) {
  return prisma.category.findUnique({ where: { name } });
}

export async function getAllCategories() {
  return prisma.category.findMany({ orderBy: { name: 'asc' } });
}

export async function updateCategory(id, data) {
  return prisma.category.update({ where: { id: Number(id) }, data });
}

export async function deleteCategory(id) {
  return prisma.category.delete({ where: { id: Number(id) } });
}

export async function getItemsInCategory(categoryId) {
  return prisma.item.findMany({
    where: { categoryId: Number(categoryId) },
    include: { seller: { select: { id: true, username: true } } },
  });
}