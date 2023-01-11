import { Router } from 'express';



import { controlunoController } from '../controllers/controlUnoController';

class GamesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();

    }

    config(): void {
        this.router.get('/', controlunoController.control)

    }


}

const gamesRoutes = new GamesRoutes();
export default gamesRoutes.router; 