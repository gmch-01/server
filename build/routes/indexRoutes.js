"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexControllers_1 = require("../controllers/indexControllers");
const gamesController_1 = require("../controllers/gamesController");
const usuariosControllers_1 = require("../controllers/usuariosControllers");
const alm_prod_finController_1 = require("../controllers/alm_prod_finController");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', indexControllers_1.indexController.index);
        this.router.post('/', gamesController_1.gamesController.create);
        this.router.post('/', usuariosControllers_1.usuariosController.list);
        this.router.post('/', alm_prod_finController_1.almacenfinController.list);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
