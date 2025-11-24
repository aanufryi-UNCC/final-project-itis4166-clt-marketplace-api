import { findById, createUser, updateUser, deleteUser, changeUserRole } from "../repositories/userRepo.js";

export async function getUserProfileService(id) {
    const user = await findById(id);
    if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    }
    return user;
}

export async function updateUserService(id, data) {
    const updated = await updateUser(id, data);
    delete updated.passwordHash;
    delete updated.refreshToken;
    return updated;
}

export async function deleteUserService(id) {
    return await deleteUser(id);
}

export async function changeUserRoleService(userId, role) {
    return await changeUserRole(Number(userId), role);
}

export async function getReviewsByUserService(username) {
  const user = await getUserByUsernameWithReviews(username);
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
  return user.reviewsWritten; 
}