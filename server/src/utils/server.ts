import express from 'express';
import deserializeUser from '../middlewares/deserializeUser';
import routes from '../routes';
import cors from 'cors';
import config from 'config';
import cookieParser from 'cookie-parser';
const createServer = () => {
    const app = express();

    // CORS
    app.use(cors({
        origin: config.get<string>('client_url'),
        credentials: true
    }))
    // body-parser
    app.use(express.json())
    app.use(cookieParser())

    // deserialize user from token every requests.
    app.use(deserializeUser)

    routes(app);

    return app;
}
export default createServer