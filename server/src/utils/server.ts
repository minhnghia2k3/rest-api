import express from 'express';
import deserializeUser from '../middlewares/deserializeUser';
import routes from '../routes';
const createServer = () => {
    const app = express();

    // body-parser
    app.use(express.json())

    // deserialize user from token every requests.
    app.use(deserializeUser)

    routes(app);

    return app;
}
export default createServer