import { Express, Request, Response } from 'express';
/* Middlewares */
import validateResource from './middlewares/validateResource';
/* Schema */
import { createUserSchema } from './schema/user.schema';
import { createSessionSchema } from './schema/session.schema';
/* Controller */
import { createUserHandler } from './controllers/user.controller';
import { createUserSessionHandler } from './controllers/session.controller';
function routes(app: Express) {
    app.get('/heathcheck', (req: Request, res: Response) => {
        res.sendStatus(200);
    })
    app.post('/api/users', validateResource(createUserSchema), createUserHandler)
    app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionHandler)
}

export default routes