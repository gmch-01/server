import { Router } from 'express';



import { recetasController } from '../controllers/recetasControllers';

class GamesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();

    }

    config(): void {
        this.router.get('/', recetasController.list)
        this.router.get('/esp', recetasController.listEsp)
        this.router.get('/:id', recetasController.getOne)
        this.router.post('/', recetasController.create)
        this.router.delete('/:id', recetasController.delete)
        this.router.put('/:id', recetasController.update)
    }


}

const productosRoutes = new GamesRoutes();
export default productosRoutes.router; 