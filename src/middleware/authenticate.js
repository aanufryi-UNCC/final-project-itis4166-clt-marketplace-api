import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const err = new Error('Not authenticated');
    err.status = 401;
    return next(err);
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);   
    req.user = payload; // Will use email and role 
    next();
  } catch {
    const err = new Error('Not authenticated');
    err.status = 401;
    next(err);
  }
}