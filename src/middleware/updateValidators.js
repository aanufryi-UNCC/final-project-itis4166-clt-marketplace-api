import { param, body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export function filterUserUpdateFields(req, res, next) {
  const allowedFields = ['username', 'email', 'role'];

  const updates = {};
  for (const key of allowedFields) {
    if (req.body[key] !== undefined) {
      updates[key] = req.body[key];
    }
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "No valid fields to update" });
  }

  req.filteredUpdate = updates;

  next()
}