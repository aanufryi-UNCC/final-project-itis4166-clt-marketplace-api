import { getUserProfileService, updateUserService, deleteUserService, changeUserRoleService } from "../services/userService.js";

export async function getUserHandler(req, res) {
  try {
    const user = await getUserProfileService(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Get user error:", error);
    return res.status(500).json({ error: "Failed to fetch user profile" });
  }
}

export async function updateUserHandler(req, res) {
  try {
    const updated = await updateUserService(
      req.params.id,
      req.filteredUpdate
    );

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updated);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Update handler error:", error);
    return res.status(500).json({ error: "Failed to update profile" });
  }
}

export async function deleteUserHandler(req, res) {
  try {
    const deleted = await deleteUserService(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    
    return res.status(204).send();
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Delete user error:", error);
    return res.status(500).json({ error: "Failed to delete user" });
  }
}

export async function changeUserRoleHandler(req, res, next) {
  try {
    console.log("req.body raw:", req.body);
    const userId = Number(req.params.id);
    const { role } = req.body;

    const updatedUser = await changeUserRoleService(userId, role);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { passwordHash, ...safeUser } = updatedUser;
    return res.json(safeUser);

  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Error changing user role:", error);
    return res.status(500).json({ error: "Failed to update role" });
  }
}