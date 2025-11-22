import {
  getReviewsByItemService,
  getReviewsByUsernameService,
  createReviewService,
  updateReviewService,
  deleteReviewService
} from '../services/reviewService.js';

export async function getReviewsByItemHandler(req, res, next) {
  try {
    const reviews = await getReviewsByItemService(req.params.itemId);
    res.json(reviews);
  } catch (e) { next(e); }
}

export async function getReviewsByUsernameHandler(req, res, next) {
  try {
    const reviews = await getReviewsByUsernameService(req.params.username);
    res.json(reviews);
  } catch (e) { next(e); }
}

export async function createReviewHandler(req, res, next) {
  try {
    const review = await createReviewService({ ...req.body, reviewerId: req.user.id });
    res.status(201).json(review);
  } catch (e) { next(e); }
}

export async function updateReviewHandler(req, res, next) {
  try {
    const updated = await updateReviewService(req.params.id, req.body);
    res.json(updated);
  } catch (e) { next(e); }
}

export async function deleteReviewHandler(req, res, next) {
  try {
    await deleteReviewService(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (e) { next(e); }
}