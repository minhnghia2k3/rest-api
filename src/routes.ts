import { Express, Request, Response } from 'express';
/* Middlewares */
import validateResource from './middlewares/validateResource';
/* Schema */
import { createUserSchema } from './schema/user.schema';
import { createSessionSchema } from './schema/session.schema';
/* Controller */
import { createUserHandler } from './controllers/user.controller';
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionHandler } from './controllers/session.controller';
import requireUser from './middlewares/requireUser';

function routes(app: Express) {
    app.get('/heathcheck', (req: Request, res: Response) => {
        res.sendStatus(200);
    })
    app.post('/api/users', validateResource(createUserSchema), createUserHandler)
    app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionHandler)
    app.get('/api/sessions', requireUser, getUserSessionHandler)
    app.delete('/api/sessions', requireUser, deleteUserSessionHandler)
}

export default routes