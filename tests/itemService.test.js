import { jest } from '@jest/globals';
import * as ItemRepo from '../src/repositories/itemRepo.js';
import * as ItemService from '../src/services/itemService.js';

jest.mock('../src/repositories/itemRepo.js');

describe('ItemService.getAllItemsService', () => {
  test('uses default  and calls repository correctly', async () => {
    const fakeItems = [{ id: 1, name: 'Item 1' }];
    ItemRepo.getAllItems.mockResolvedValue(fakeItems);

    const result = await ItemService.getAllItemsService({});

    expect(ItemRepo.getAllItems).toHaveBeenCalledWith(0, 50);
    expect(result).toBe(fakeItems);
  });

  test("throws 400 when take > 100", async () => {
    await expect(
      ItemService.getAllItemsService({ take: 200 })
    ).rejects.toMatchObject({
      message: "Max 'take' is 100",
      status: 400,
    });
  });
});

describe('ItemService.createItemService', () => {
  test('throws 400 when required fields are missing', async () => {
    await expect(
      ItemService.createItemService({ name: 'X' }, 1)
    ).rejects.toMatchObject({
      message: 'Missing required fields: name, price, or categoryId',
      status: 400,
    });
  });

  test('creates item with transformed numeric fields', async () => {
    const body = {
      name: 'Test',
      description: 'desc',
      price: '9.99',
      categoryId: '3',
    };
    const userId = 7;
    const created = { id: 1, ...body, price: 9.99 };
    ItemRepo.createItem.mockResolvedValue(created);

    const result = await ItemService.createItemService(body, userId);

    expect(ItemRepo.createItem).toHaveBeenCalledWith({
      name: 'Test',
      description: 'desc',
      price: 9.99,
      categoryId: 3,
      sellerId: 7,
    });
    expect(result).toBe(created);
  });
});

describe('ItemService.findItemById', () => {
  test('throws on invalid id', async () => {
    await expect(ItemService.findItemById('abc')).rejects.toThrow(
      'Invalid item ID'
    );
  });

  test('calls repo with numeric id on success', async () => {
    const item = { id: 5, name: 'Item' };
    ItemRepo.findItemById.mockResolvedValue(item);

    const result = await ItemService.findItemById('5');

    expect(ItemRepo.findItemById).toHaveBeenCalledWith(5);
    expect(result).toBe(item);
  });
});

describe('ItemService.updateItem', () => {
  const user = { id: 10 };

  test('throws 404 when item does not exist', async () => {
    ItemRepo.findItemById.mockResolvedValue(null);

    await expect(
      ItemService.updateItem(1, { name: 'New' }, user)
    ).rejects.toMatchObject({
      message: 'Item not found',
      status: 404,
    });
  });

  test('throws 403 when user is not seller', async () => {
    ItemRepo.findItemById.mockResolvedValue({ id: 1, seller: { id: 99 } });

    await expect(
      ItemService.updateItem(1, { name: 'New' }, user)
    ).rejects.toMatchObject({
      message: 'Not authorized to update this item',
      status: 403,
    });
  });

  test('updates item when user is seller', async () => {
    const updated = { id: 1, name: 'Updated' };
    ItemRepo.findItemById.mockResolvedValue({ id: 1, seller: { id: 10 } });
    ItemRepo.updateItem.mockResolvedValue(updated);

    const result = await ItemService.updateItem(
      1,
      { name: 'Updated' },
      user
    );

    expect(ItemRepo.updateItem).toHaveBeenCalledWith(1, { name: 'Updated' });
    expect(result).toBe(updated);
  });
});

describe('ItemService.deleteItem', () => {
  const user = { id: 10 };

  test('throws 404 when item does not exist', async () => {
    ItemRepo.findItemById.mockResolvedValue(null);

    await expect(ItemService.deleteItem(1, user)).rejects.toMatchObject({
      message: 'Item not found',
      status: 404,
    });
  });

  test('throws 403 when user is not seller', async () => {
    ItemRepo.findItemById.mockResolvedValue({ id: 1, seller: { id: 99 } });

    await expect(ItemService.deleteItem(1, user)).rejects.toMatchObject({
      message: 'Not authorized to delete this item',
      status: 403,
    });
  });

  test('deletes item when user is seller', async () => {
    ItemRepo.findItemById.mockResolvedValue({ id: 1, seller: { id: 10 } });
    ItemRepo.deleteItem.mockResolvedValue({});

    const result = await ItemService.deleteItem(1, user);

    expect(ItemRepo.deleteItem).toHaveBeenCalledWith(1);
    expect(result).toEqual({});
  });
});

describe('ItemService.getItemReviews', () => {
  test('throws 400 on invalid item id', async () => {
    await expect(ItemService.getItemReviews('abc')).rejects.toMatchObject({
      message: 'Invalid item ID',
      status: 400,
    });
  });

  test('returns reviews for valid id', async () => {
    const reviews = [{ id: 1, rating: 5 }];
    ItemRepo.getItemReviews.mockResolvedValue(reviews);

    const result = await ItemService.getItemReviews('3');

    expect(ItemRepo.getItemReviews).toHaveBeenCalledWith(3);
    expect(result).toBe(reviews);
  });
});