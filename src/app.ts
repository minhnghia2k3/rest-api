import express from 'express';
import config from 'config';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';
import deserializeUser from './middlewares/deserializeUser';

const app = express();
const port = config.get<number>('port')

// body-parser
app.use(express.json())

// deserialize user from token every requests.
app.use(deserializeUser)

app.listen(port, async () => {
    logger.info(`Server is running at http://localhost:${port}`)
    await connect();

    routes(app);
})
