import { jest } from '@jest/globals';
import * as ItemService from '../src/services/itemService.js';
import {
  getItemsHandler,
  getItemHandler,
  createItemHandler,
  updateItemHandler,
  deleteItemHandler,
  getItemReviewsHandler,
} from '../src/controllers/itemController.js';

jest.mock('../src/services/itemService.js');

function createRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('Item Controllers', () => {
  let next;

  beforeEach(() => {
    next = jest.fn();
    jest.clearAllMocks();
  });

  test('getItemsHandler returns items', async () => {
    const items = [{ id: 1 }];
    ItemService.getAllItemsService.mockResolvedValue(items);
    const req = { query: {} };
    const res = createRes();

    await getItemsHandler(req, res, next);

    expect(ItemService.getAllItemsService).toHaveBeenCalledWith(req.query);
    expect(res.json).toHaveBeenCalledWith(items);
    expect(next).not.toHaveBeenCalled();
  });

  test('getItemsHandler forwards errors to next', async () => {
    const error = new Error('boom');
    ItemService.getAllItemsService.mockRejectedValue(error);
    const req = { query: {} };
    const res = createRes();

    await getItemsHandler(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  test('getItemHandler 404 when item not found', async () => {
    ItemService.findItemById.mockResolvedValue(null);
    const req = { params: { id: '1' } };
    const res = createRes();

    await getItemHandler(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Item not found' });
  });

  test('getItemHandler returns item when found', async () => {
    const item = { id: 1 };
    ItemService.findItemById.mockResolvedValue(item);
    const req = { params: { id: '1' } };
    const res = createRes();

    await getItemHandler(req, res, next);

    expect(res.json).toHaveBeenCalledWith(item);
  });

  test('createItemHandler returns 201 with created item', async () => {
    const created = { id: 2, name: 'New' };
    ItemService.createItemService.mockResolvedValue(created);
    const req = { body: { name: 'New' }, user: { id: 5 } };
    const res = createRes();

    await createItemHandler(req, res, next);

    expect(ItemService.createItemService).toHaveBeenCalledWith(
      req.body,
      req.user.id
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(created);
  });

  test('updateItemHandler returns updated item', async () => {
    const updated = { id: 1, name: 'Updated' };
    ItemService.updateItem.mockResolvedValue(updated);
    const req = {
      params: { id: '1' },
      body: { name: 'Updated' },
      user: { id: 10 },
    };
    const res = createRes();

    await updateItemHandler(req, res, next);

    expect(ItemService.updateItem).toHaveBeenCalledWith(
      req.params.id,
      req.body,
      req.user
    );
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  test('deleteItemHandler returns success message', async () => {
    ItemService.deleteItem.mockResolvedValue({});
    const req = { params: { id: '1' }, user: { id: 10 } };
    const res = createRes();

    await deleteItemHandler(req, res, next);

    expect(ItemService.deleteItem).toHaveBeenCalledWith(
      req.params.id,
      req.user
    );
    expect(res.json).toHaveBeenCalledWith({ message: 'Item deleted' });
  });

  test('getItemReviewsHandler returns reviews', async () => {
    const reviews = [{ id: 1, rating: 5 }];
    ItemService.getItemReviews.mockResolvedValue(reviews);
    const req = { params: { id: '3' } };
    const res = createRes();

    await getItemReviewsHandler(req, res, next);

    expect(ItemService.getItemReviews).toHaveBeenCalledWith(req.params.id);
    expect(res.json).toHaveBeenCalledWith(reviews);
  });

  test('controller handlers call next on service error', async () => {
    const error = new Error('oops');
    ItemService.updateItem.mockRejectedValue(error);
    const req = {
      params: { id: '1' },
      body: {},
      user: { id: 1 },
    };
    const res = createRes();

    await updateItemHandler(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});