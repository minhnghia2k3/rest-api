import { Express, Request, Response } from 'express';
/* Middlewares */
import validateResource from './middlewares/validateResource';
import requireUser from './middlewares/requireUser';
/* Schema */
import { createUserSchema } from './schema/user.schema';
import { createSessionSchema } from './schema/session.schema';
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from './schema/product.schema';
/* Controller */
import { createUserHandler, getCurrentUser } from './controllers/user.controller';
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionHandler } from './controllers/session.controller';

import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from './controllers/product.controller';

function routes(app: Express) {
    app.get('/heathcheck', (req: Request, res: Response) => {
        res.sendStatus(200);
    })

    /* User & session */
    app.get('/api/me', requireUser, getCurrentUser)
    app.post('/api/users', validateResource(createUserSchema), createUserHandler)
    app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionHandler)
    app.get('/api/sessions', requireUser, getUserSessionHandler)
    app.delete('/api/sessions', requireUser, deleteUserSessionHandler)

    /* Products */
    app.post('/api/products', [requireUser, validateResource(createProductSchema)], createProductHandler)
    app.get('/api/products/:productId', validateResource(getProductSchema), getProductHandler)
    app.put('/api/products/:productId', [requireUser, validateResource(updateProductSchema)], updateProductHandler)
    app.delete('/api/products/:productId', [requireUser, validateResource(deleteProductSchema)], deleteProductHandler)
}

export default routes