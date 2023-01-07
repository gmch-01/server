"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alm_prod_finController_1 = require("../controllers/alm_prod_finController");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', alm_prod_finController_1.almacenfinController.list);
        this.router.get('/:id', alm_prod_finController_1.almacenfinController.getOne);
        this.router.post('/', alm_prod_finController_1.almacenfinController.create);
        this.router.delete('/:id', alm_prod_finController_1.almacenfinController.delete);
        this.router.put('/:id', alm_prod_finController_1.almacenfinController.update);
    }
}
const almacenfinRoutes = new IndexRoutes();
exports.default = almacenfinRoutes.router;
