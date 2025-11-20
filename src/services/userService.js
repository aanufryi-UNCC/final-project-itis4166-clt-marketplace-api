import { findById, createUser, updateUser, deleteUser } from "../repositories/userRepo";

export async function getUserProfile(id) {
    return await findById(id);
}

export async function registerUser(data) {
    return await createUser(data);
}

export async function updateUser(id) {
    return await updateUser(id);
}

export async function deleteUser(id) {
    return await deleteUser(id);
}