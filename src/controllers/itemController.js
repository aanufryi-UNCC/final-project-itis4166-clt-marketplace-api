import * as ItemRepo from '../repositories/itemRepo.js';

export async function getItemsHandler(req, res, next) {
  try { res.json(await ItemRepo.getAllItems()); } catch (e) { next(e); }
}

export async function getItemHandler(req, res, next) {
  try {
    const item = await ItemRepo.findItemById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (e) { next(e); }
}

export async function createItemHandler(req, res, next) {
  try { 
    const item = await ItemRepo.createItem({ ...req.body, sellerId: req.user.id });
    res.status(201).json(item); } catch (e) { 
        next(e); 
    }
}

export async function updateItemHandler(req, res, next) {
  try { 
    const updated = await ItemRepo.updateItem(req.params.id, req.body); 
    res.json(updated); 
    } catch (e) { 
        next(e); 
    }
}

export async function deleteItemHandler(req, res, next) {
  try { await ItemRepo.deleteItem(req.params.id); 
    res.json({ message: 'Item deleted' }); 
        } catch (e) { 
            next(e); 
        }
}

export async function getItemReviewsHandler(req, res, next) {
  try { 
    res.json(await ItemRepo.getItemReviews(req.params.id)); 
    } catch (e) { next(e); }
}