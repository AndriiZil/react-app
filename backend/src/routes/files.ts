import { Router } from 'express';
import FilesController from '../controllers/filesController';

const r = Router();

r.post('/:subfolderId/create', FilesController.createFileSub);

r.post('/directory/:directoryId/create', FilesController.createFileDir);

r.get('/', FilesController.getAll);

r.get('/:id', FilesController.getById);

r.patch('/:id', FilesController.updateById);

r.patch('/:fileId/moveto/:destId', FilesController.moveFile);

r.delete('/:id', FilesController.deleteById);

export default r;
