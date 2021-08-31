import { Request, Response, NextFunction} from 'express';
import { getRepository } from 'typeorm';
import { Subfolder } from '../models/Subfolder';

class SubfoldersController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const subfolder = new Subfolder();

            subfolder.name = req.body.name;
            subfolder.directory = req.params.directoryId;

            await getRepository(Subfolder).save(subfolder);

            return res.send(subfolder);
        } catch (err) {
            next(err);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const subfolders = await getRepository(Subfolder)
                .createQueryBuilder('subfolder')
                .leftJoinAndSelect('subfolder.files', 'files')
                .getMany();

            return res.send(subfolders);
        } catch (err) {
            next(err);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const subfolder = await getRepository(Subfolder)
                .createQueryBuilder('subfolder')
                .leftJoinAndSelect('subfolder.files', 'files')
                .where('subfolder.id = :id', { id: req.params.id })
                .getOne();

            return res.send(subfolder);
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

export default SubfoldersController;
