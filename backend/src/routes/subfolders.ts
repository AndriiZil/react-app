import { Router } from 'express';
import SubfoldersController from '../controllers/subfoldersController';

const r = Router();

r.post('/:directoryId/create', SubfoldersController.create);

r.get('/', SubfoldersController.getAll);

r.get('/:id', SubfoldersController.getById);

r.patch('/:id', SubfoldersController.updateById);

r.delete('/', SubfoldersController.deleteById);

export default r;
