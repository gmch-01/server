import { Router } from 'express';

import { posiblesController } from '../controllers/control_posibleController';

class PosiblesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();

    }

    config(): void {
        this.router.get('/', posiblesController.list)
    }


}

const posiblesRoutes = new PosiblesRoutes();
export default posiblesRoutes.router; 