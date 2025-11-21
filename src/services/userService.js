import { findById, createUser, updateUser, deleteUser } from "../repositories/userRepo.js";

export async function getUserProfileService(id) {
    return await findById(id);
}

export async function registerUserService(data) {
    return await createUserService(data);
}

export async function updateUserService(id) {
    return await updateUser(id);
}

export async function deleteUserService(id) {
    return await deleteUser(id);
}