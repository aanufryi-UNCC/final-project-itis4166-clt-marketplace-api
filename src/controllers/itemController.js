import * as ItemService from '../services/itemService.js';

export async function getItemsHandler(req, res, next) {
  try {
    const items = await ItemService.getAllItemsService(req.query);
    res.json(items);
  } catch (e) {
    next(e);
  }
}

export async function getItemHandler(req, res, next) {
  try {
    const item = await ItemService.findItemById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (e) { next(e); }
}

export async function createItemHandler(req, res, next) {
  try {
    const item = await ItemService.createItemService(req.body, req.user.id);
    res.status(201).json(item);
  } catch (e) {
    next(e);
  }
}

export async function updateItemHandler(req, res, next) {
  try { 
    const updated = await ItemService.updateItem(req.params.id, req.body, req.user); 
    res.json(updated); 
    } catch (e) { 
        next(e); 
    }
}

export async function deleteItemHandler(req, res, next) {
  try { await ItemService.deleteItem(req.params.id, req.user); 
    res.json({ message: 'Item deleted' }); 
        } catch (e) { 
            next(e); 
        }
}

export async function getItemReviewsHandler(req, res, next) {
  try { 
    const reviews = await ItemService.getItemReviews(req.params.id); 
    res.json(reviews);
    } catch (e) { next(e); }
}