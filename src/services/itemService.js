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