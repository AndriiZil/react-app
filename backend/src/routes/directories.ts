import { Router } from 'express';
import DirectoriesController from '../controllers/directoriesController';

const r = Router();

r.post('/', DirectoriesController.create);

r.get('/', DirectoriesController.getAll);

r.get('/:id', DirectoriesController.getById);

r.patch('/:id', DirectoriesController.updateById);

r.delete('/', DirectoriesController.deleteById);

export default r;
