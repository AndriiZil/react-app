import { Request, Response, NextFunction} from 'express';
import { getRepository } from 'typeorm';
import { File } from '../models/File';
import {Directory} from '../models/Directory';
import {Subfolder} from '../models/Subfolder';
import {customError} from '../utils';

class FilesController {

    static async createFileSub(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('LOG', req.params.subfolderId);
            const file = new File();

            file.name = req.body.name;
            file.directory = null;
            file.subfolder = req.params.subfolderId;

            await getRepository(File).save(file);

            return res.status(201).send(file);
        } catch (err) {
            next(err);
        }
    }

    static async createFileDir(req: Request, res: Response, next: NextFunction) {
        try {
            const file = new File();

            file.name = req.body.name;
            file.subfolder = null;
            file.directory = req.params.directoryId;

            await getRepository(File).save(file);

            return res.status(201).send(file);
        } catch (err) {
            next(err);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            let files: File[] = [];
            // @ts-ignore
            const searchString = req.query.search || '';

            if (searchString) {
                files = await getRepository(File)
                    .createQueryBuilder('file')
                    .where('file.name like :name', { name: `%${searchString}%`})
                    .orWhere('file.tag like :tag', { tag: `%${searchString}%`})
                    .orWhere('file.text like :text', { text: `%${searchString}%`})
                    .leftJoinAndSelect('file.subfolder', 'fileSubfolder')
                    .leftJoinAndSelect('file.directory', 'fileDirectory')
                    .getMany()
            } else {
                files = await getRepository(File)
                    .createQueryBuilder('file')
                    .leftJoinAndSelect('file.subfolder', 'fileSubfolder')
                    .leftJoinAndSelect('file.directory', 'fileDirectory')
                    .getMany()
            }

            return res.send(files);
        } catch (err) {
            next(err);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const file = await getRepository(File)
                .createQueryBuilder('file')
                .leftJoinAndSelect('file.subfolder', 'fileSubfolder')
                .leftJoinAndSelect('file.directory', 'fileDirectory')
                .where('file.id = :id', { id: req.params.id })
                .getOne()

            return res.send(file);
        } catch (err) {
            next(err);
        }
    }

    static async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            await getRepository(File)
                .createQueryBuilder()
                .update(File)
                .set(req.body)
                .where('id = :id', { id: req.params.id })
                .execute();

            return res.status(204).end();
        } catch (err) {
            next(err);
        }
    }

    static async moveFile(req: Request, res: Response, next: NextFunction) {
        try {
            const { fileId, destId } = req.params;

            if (!fileId || !destId) {
                customError('Not enough incoming params', 422);
            }

            const [directory, subfolder] = await Promise.all([
                getRepository(Directory).findOne({ id: destId }),
                getRepository(Subfolder).findOne({ id: destId }),
            ]);

            if (directory) {
                await getRepository(File)
                    .createQueryBuilder()
                    .update(File)
                    .set({
                        directory: destId,
                        subfolder: null,
                    })
                    .where('id = :fileId', { fileId })
                    .execute();
            }

            if (subfolder) {
                await getRepository(File)
                    .createQueryBuilder()
                    .update(File)
                    .set({
                        subfolder: destId,
                        directory: null,
                    })
                    .where('id = :fileId', { fileId })
                    .execute();
            }

            return res.status(204).end();
        } catch (err) {
            next(err);
        }
    }

    static async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            await getRepository(File)
                .createQueryBuilder()
                .delete()
                .from(File)
                .where('id = :id', { id: req.params.id })
                .execute();

            return res.status(204).end();
        } catch (err) {
            next(err);
        }
    }

}

export default FilesController;
