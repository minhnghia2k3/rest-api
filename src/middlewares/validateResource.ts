import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';


// Currying technique
const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body, // 'fish' => returns "fish"
            query: req.query,
            params: req.params
        })
        return next();
    } catch (error: any) {
        return res.status(400).json({ error: error.errors })
    }
}

export default validate;