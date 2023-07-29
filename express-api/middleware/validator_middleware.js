import { validationResult } from "express-validator";

export const validatorMiddleware = (req, res , next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(406).json({ errors: errors.array() });
    }
    next();
}