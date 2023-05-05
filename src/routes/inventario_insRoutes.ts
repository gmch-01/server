import { Router } from 'express';

import { inventarioinsController } from '../controllers/inventarioInsController';

class InventarioInsRoutes {

    public router: Router = Router();

    constructor() {
        this.config();

    }

    config(): void {
        this.router.get('/', inventarioinsController.list)
        this.router.get('/esp', inventarioinsController.listesp)
        this.router.get('/chart', inventarioinsController.datachart)
        this.router.get('/lotes', inventarioinsController.lotes)
        this.router.get('/:id', inventarioinsController.getOne)
        this.router.get('/graf/:valor', inventarioinsController.getCharts)
        this.router.post('/', inventarioinsController.create)
        this.router.delete('/:id', inventarioinsController.delete)
        this.router.put('/:id', inventarioinsController.update)
    }


}

const inventarioinsRoutes = new InventarioInsRoutes();
export default inventarioinsRoutes.router; 