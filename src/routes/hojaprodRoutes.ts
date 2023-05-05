import { Router } from 'express';



import { hojaprodController } from '../controllers/hojaproduccionController';

class HojaProdRoutes {

    public router: Router = Router();

    constructor() {
        this.config();

    }

    config(): void {
        this.router.get('/', hojaprodController.list)
        this.router.get('/esp', hojaprodController.listesp)
        this.router.get('/hoy', hojaprodController.hoydesp)
        this.router.get('/hoyrec', hojaprodController.hoyrec)
        this.router.get('/:id', hojaprodController.getOne)
        this.router.post('/', hojaprodController.create)
        this.router.delete('/:id', hojaprodController.delete)
        this.router.put('/:id', hojaprodController.update)
    }


}

const hojaprodRoutes = new HojaProdRoutes();
export default hojaprodRoutes.router; 