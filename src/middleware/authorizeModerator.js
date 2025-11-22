export function authorizeModerator(req, res, next) {
  //Check if user is authenticated / logged in
  if (!req.user) {
        const err = new Error('Authentication required');
        err.status = 401;
    return next(err);
  }
  //Check if user is moderator
  const role = req.user.role?.toUpperCase();
  if (role !== 'MODERATOR') {
    const err = new Error('Do not have permission');
    err.status = 403;
    return next(err);
  }
    next();
}