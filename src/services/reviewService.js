import * as ReviewRepo from '../repositories/reviewRepo.js';

export async function getReviewsByItemService(itemId) {
  return ReviewRepo.getReviewsByItem(itemId);
}

export async function getReviewsByUsernameService(username) {
  return ReviewRepo.getReviewsByUsername(username);
}

export async function createReviewService(data) {
  return ReviewRepo.createReview(data);
}

export async function updateReviewService(id, data) {
  return ReviewRepo.updateReview(id, data);
}

export async function deleteReviewService(id) {
  return ReviewRepo.deleteReview(id);
}