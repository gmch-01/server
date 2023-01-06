import { Router } from 'express';

import { indexController } from '../controllers/indexControllers';
import { gamesController } from '../controllers/gamesController';
import { usuariosController } from '../controllers/usuariosControllers';
import { almacenfinController } from '../controllers/alm_prod_finController';
class IndexRoutes {

    public router: Router = Router();

    constructor() {
        this.config();

    }

    config(): void {
        this.router.get('/', indexController.index)
        this.router.post('/', gamesController.create)
        this.router.post('/', usuariosController.list)
        this.router.post('/', almacenfinController.list)
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router; 