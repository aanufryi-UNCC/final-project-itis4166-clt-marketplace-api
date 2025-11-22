import * as CategoryRepo from '../repositories/categoryRepo.js';

export async function getAllCategoriesService() {
  return CategoryRepo.getAllCategories();
}

export async function getCategoryService(id) {
  return CategoryRepo.findCategoryById(id);
}

export async function createCategoryService(data) {
  return CategoryRepo.createCategory(data);
}

export async function updateCategoryService(id, data) {
  return CategoryRepo.updateCategory(id, data);
}

export async function deleteCategoryService(id) {
  return CategoryRepo.deleteCategory(id);
}