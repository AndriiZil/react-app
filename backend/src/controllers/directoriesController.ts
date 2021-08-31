import { Request, Response, NextFunction} from 'express';
import {getRepository } from 'typeorm';
import { Directory } from '../models/Directory';

class DirectoriesController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const directory = new Directory();
            directory.name = req.body.name;

            await getRepository(Directory).save(directory);

            return res.status(201).send(directory);
        } catch (err) {
            next(err);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const directories = await getRepository(Directory)
                .createQueryBuilder('directory')
                .leftJoinAndSelect('directory.subfolders', 'subfolders')
                .leftJoinAndSelect('subfolders.files', 'subfolderfiles')
                .leftJoinAndSelect('directory.files', 'directoryFiles')
                .getMany();

            return res.send(directories);
        } catch (err) {
            next(err);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const directory = await getRepository(Directory)
                .createQueryBuilder('directory')
                .leftJoinAndSelect('directory.subfolders', 'subfolders')
                .leftJoinAndSelect('subfolders.files', 'files')
                .where('directory.id = :id', { id: req.params.id })
                .getOne();

            return res.send(directory);
        } catch (err) {
            next(err);
        }
    }

    static async updateById(req: Request, res: Response, next: NextFunction) {
        try {

            return res.send('ok');
        } catch (err) {
            next(err);
        }
    }

    static async deleteById(req: Request, res: Response, next: NextFunction) {
        try {

            return res.send('ok');
        } catch (err) {
            next(err);
        }
    }

}

export default DirectoriesController;
