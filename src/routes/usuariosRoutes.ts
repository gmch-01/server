import { Router } from 'express';

import { indexController } from '../controllers/indexControllers';
import { usuariosController } from '../controllers/usuariosControllers';
class IndexRoutes {

    public router: Router = Router();

    constructor() {
        this.config();

    }

    config(): void {
        this.router.get('/', usuariosController.list)
        this.router.get('/:id', usuariosController.getOne)
        this.router.post('/', usuariosController.create)
        this.router.delete('/:id', usuariosController.delete)
        this.router.put('/:id', usuariosController.update)
    }
}

const usuariosRoutes = new IndexRoutes();
export default usuariosRoutes.router; 