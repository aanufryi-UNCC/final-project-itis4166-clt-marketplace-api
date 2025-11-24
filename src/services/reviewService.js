import * as ReviewRepo from '../repositories/reviewRepo.js';

export async function getReviewsByItemService(itemId) {
  return ReviewRepo.getReviewsByItem(itemId);
}

export async function getReviewsByUsernameService(username) {
  return ReviewRepo.getReviewsByUsername(username);
}

export async function createReviewService(data) {
  const { rating, comment, itemId } = data;

  const review = await ReviewRepo.createReview({
    rating,
    comment: comment ?? null,
    itemId: Number(itemId),       // convert to number, because for some reason it gets confused if you dont even if its a number
    reviewerId: data.reviewerId, 
  });

  return review;
}

export async function updateReviewService(id, data) {
  return ReviewRepo.updateReview(id, data);
}

export async function deleteReviewService(id) {
  return ReviewRepo.deleteReview(id);
}