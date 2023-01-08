import { Router } from 'express';



import { productosController } from '../controllers/productosController';

class GamesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();

    }

    config(): void {
        this.router.get('/', productosController.list)
        this.router.get('/:id', productosController.getOne)
        this.router.post('/', productosController.create)
        this.router.delete('/:id', productosController.delete)
        this.router.put('/:id', productosController.update)
    }


}

const productosRoutes = new GamesRoutes();
export default productosRoutes.router; 