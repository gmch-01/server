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
        this.router.post('/', usuariosController.create)
    }
}

const usuariosRoutes = new IndexRoutes();
export default usuariosRoutes.router; 