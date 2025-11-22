import {rateLimit} from 'express-rate-limit';  
const LogInLimiter = rateLimit({
    windowMs: 60 * 1000 * 5, // 5 minutes
    handler: (req, res, next) => {
        const error = new Error('Too many requests, try again in 5 minutes');
        error.status = 429;
        next(error);
    }
});

export default LogInLimiter;