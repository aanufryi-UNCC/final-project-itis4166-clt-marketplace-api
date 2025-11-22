import {
  getAllCategoriesService,
  getCategoryService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService
} from '../services/categoryService.js';

export async function getAllCategoriesHandler(req, res, next) {
  try {
    res.json(await getAllCategoriesService()); 
    } catch (e) { 
        next(e);
    }
}

export async function getCategoryHandler(req, res, next) {
  try {
    const cat = await getCategoryService(req.params.id);
    if (!cat) return res.status(404).json({ message: 'Category not found' });
    res.json(cat);
  } catch (e) { next(e); }
}

export async function createCategoryHandler(req, res, next) {
  try { 
    const cat = await createCategoryService(req.body);
    res.status(201).json(cat);
} catch (e) { 
    next(e); 
}
}

export async function updateCategoryHandler(req, res, next) {
  try { const updated = await updateCategoryService(req.params.id, req.body);
    res.json(updated);
    } catch (e) { 
        next(e); 
    }
}

export async function deleteCategoryHandler(req, res, next) {
  try { 
    await deleteCategoryService(req.params.id);
    res.json({ message: 'Category deleted' }); 
    } catch (e) {
        next(e);
    }
}