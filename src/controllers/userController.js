import { getUserProfileService, updateUserService, deleteUserService } from "../services/userService.js";

export async function getUserHandler(req, res) {
    try {
        const user = await getUserProfileService(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user profile'});
    }
}

export async function updateUserHandler(req, res) {
    try {
        const updated = await updateUserService(req.params.id, req.body);
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ error: 'Failed to update profile'});
    }
}

export async function deleteUserHandler(req, res) {
    try {
        await deleteUserService(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user profile'});
    }
}