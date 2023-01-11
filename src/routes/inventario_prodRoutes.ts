import { Router } from 'express';

import { inventarioprodController } from '../controllers/inventarioProdController';

class InventarioProdRoutes {

    public router: Router = Router();

    constructor() {
        this.config();

    }

    config(): void {
        this.router.get('/', inventarioprodController.list)
        this.router.get('/:id', inventarioprodController.getOne)
        this.router.post('/', inventarioprodController.create)
        this.router.delete('/:id', inventarioprodController.delete)
        this.router.put('/:id', inventarioprodController.update)
    }


}

const inventarioprodRoutes = new InventarioProdRoutes();
export default inventarioprodRoutes.router; 