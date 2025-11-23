import * as ItemRepo from "../repositories/itemRepo.js";

export async function getAllItemsService(query) {
    // Parse pagination from query
    const skip = Number(query.skip) || 0;
    const take = Number(query.take) || 50;

    if (take > 100) {
        const err = new Error("Max 'take' is 100");
        err.status = 400;
        throw err;
    }

    return await ItemRepo.getAllItems(skip, take);
}

export async function createItemService(body, userId) {
    const { name, description, price, categoryId } = body;

    if (!name || !price || !categoryId) {
        const error = new Error("Missing required fields: name, price, or categoryId");
        error.status = 400;
        throw error;
    }

    return ItemRepo.createItem({
        name,
        description: description || null,
        price: Number(price),
        categoryId: Number(categoryId),
        sellerId: Number(userId),
    });
    }

export async function findItemById(id) {
    const itemId = Number(id);
    if (isNaN(itemId)) {
        throw new Error("Invalid item ID");
    }

    return ItemRepo.findItemById(itemId);
    }

export async function updateItem(id, data, user) {
    const existing = await ItemRepo.findItemById(id);
    if (!existing) {
        const err = new Error("Item not found");
        err.status = 404;
        throw err;
    }

    //Only the seller can update the item
    if (existing.seller.id !== user.id) {
        const err = new Error("Not authorized to update this item");
        err.status = 403;
        throw err;
    }

    return await ItemRepo.updateItem(id, data);
    }

export async function deleteItem(id, user) {
    const existing = await ItemRepo.findItemById(id);
    if (!existing) {
        const err = new Error("Item not found");
        err.status = 404;
        throw err;
    }

  //Only the seller can delete
    if (existing.seller.id !== user.id) {
        const err = new Error("Not authorized to delete this item");
        err.status = 403;
        throw err;
    }

    return await ItemRepo.deleteItem(id);
}

export async function getItemReviews(itemId) {
  // checks if item ID exists
  const id = Number(itemId);
  if (isNaN(id)) {
    const err = new Error('Invalid item ID');
    err.status = 400;
    throw err;
  }

  return ItemRepo.getItemReviews(id);
}