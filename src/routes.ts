import { Express, Request, Response } from 'express';
import { createUserHandler } from './controllers/user.controller';
import validateResource from './middlewares/validateResource';
import { createUserSchema } from './schema/user.schema';
function routes(app: Express) {
    app.get('/heathcheck', (req: Request, res: Response) => {
        res.sendStatus(200);
    })
    app.post('/api/users', validateResource(createUserSchema), createUserHandler)
}

export default routes