import { findById, createUser, updateUser, deleteUser } from "../repositories/userRepo.js";

export async function getUserProfileService(id) {
    return await findById(id);
}

export async function updateUserService(id) {
    return await updateUser(id);
}

export async function deleteUserService(id) {
    return await deleteUser(id);
}

export async function getReviewsByUserService(username) {
  const user = await getUserByUsernameWithReviews(username);
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
  return user.reviewsWritten; 
}