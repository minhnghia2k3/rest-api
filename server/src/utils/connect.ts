// Database connection
import mongoose from "mongoose";
import config from "config";
import logger from "./logger"

async function connect() {
    const dbURI = config.get<string>("dbURI")
    try {
        await mongoose.connect(dbURI)
        logger.info("Connect database successfully!")
    } catch (error) {
        logger.error("Connect failure!")
        process.exit(1);
    }
}

export default connect;