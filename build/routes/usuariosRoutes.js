"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosControllers_1 = require("../controllers/usuariosControllers");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', usuariosControllers_1.usuariosController.list);
        this.router.get('/:id', usuariosControllers_1.usuariosController.getOne);
        this.router.post('/', usuariosControllers_1.usuariosController.create);
        this.router.delete('/:id', usuariosControllers_1.usuariosController.delete);
        this.router.put('/:id', usuariosControllers_1.usuariosController.update);
    }
}
const usuariosRoutes = new IndexRoutes();
exports.default = usuariosRoutes.router;
