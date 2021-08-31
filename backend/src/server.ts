import express from 'express';
import logger from 'morgan';
import * as http from 'http';
import cors from 'cors';

import { Router } from './routes/allRoutes';
import { establishConnection } from './db';
import { error404, handleErrors } from './utils';

class Server {

    constructor(
        public server: http.Server | null = null,
        private app: express.Express | null = null
    ) {}

    async start() {
        this.initServer();
        await this.dbConnection();
        this.middlewares();
        this.routes();
        this.errorHandler();
        this.unhandledRejectionError();
        this.listen();
    }

    initServer() {
        this.app = express();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(logger('dev'));
    }

    routes() {
        Router(this.app);
    }

    listen() {
        const PORT = process.env.PORT || 3200;
        this.server = this.app.listen(PORT, () => {
            console.log(`Server started on port: "${PORT}"`);
        });
    }

    async dbConnection() {
        await establishConnection();
    }

    errorHandler() {
        this.app.use(error404);
        this.app.use(handleErrors);
    }

    unhandledRejectionError() {
        process.on('unhandledRejection', (error) => {
            console.error(error);
            this.server?.close(() => process.exit(1));
        });
    }
}

export default Server;
