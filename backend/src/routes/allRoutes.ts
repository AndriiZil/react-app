import express, { Request, Response } from 'express';
import directories from './directories';
import subfolders from './subfolders';
import files from './files';

const prefix = '/api';

export const Router = (app: express.Application) => {
    app.get(`${prefix}/status`, (req: Request, res: Response) => res.send({ status: 'healthy' }));
    app.use(`${prefix}/directories`, directories);
    app.use(`${prefix}/subfolders`, subfolders);
    app.use(`${prefix}/files`, files);
};
