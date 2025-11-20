import { getUserProfile, registerUser, updateUser, deleteUser } from "../services/userService";

export async function getUser(req, res) {
    try {
        const user = await getUserProfile(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user profile'});
    }
}

export async function updateUser(req, res) {
    try {
        const updated = await updateUser(req.params.id, req.body);
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ error: 'Failed to update profile'});
    }
}

export async function deleteUser(req, res) {
    try {
        await deleteUser(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user profile'});
    }
}