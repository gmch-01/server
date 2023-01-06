import { Router } from 'express';

import { indexController } from '../controllers/indexControllers';
import { almacenfinController } from '../controllers/alm_prod_finController';
class IndexRoutes {

    public router: Router = Router();

    constructor() {
        this.config();

    }

    config(): void {
        this.router.get('/', almacenfinController.list)
        this.router.get('/:id', almacenfinController.getOne)
        this.router.post('/', almacenfinController.create)
        this.router.delete('/:id', almacenfinController.delete)
        this.router.put('/:id', almacenfinController.update)
    }
}

const almacenfinRoutes = new IndexRoutes();
export default almacenfinRoutes.router; 