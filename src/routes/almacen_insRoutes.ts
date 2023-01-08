import { Router } from 'express';

import { indexController } from '../controllers/indexControllers';
import { almacenInsumoController } from '../controllers/almacenInsumosController';
class IndexRoutes {

    public router: Router = Router();

    constructor() {
        this.config();

    }

    config(): void {
        this.router.get('/', almacenInsumoController.list)
        this.router.get('/:id', almacenInsumoController.getOne)
        this.router.post('/', almacenInsumoController.create)
        this.router.delete('/:id', almacenInsumoController.delete)
        this.router.put('/:id', almacenInsumoController.update)
    }
}

const almaceninsumoRoutes = new IndexRoutes();
export default almaceninsumoRoutes.router; 