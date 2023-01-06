"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexControllers_1 = require("../controllers/indexControllers");
const gamesController_1 = require("../controllers/gamesController");
const usuariosControllers_1 = require("../controllers/usuariosControllers");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', indexControllers_1.indexController.index);
        this.router.post('/', gamesController_1.gamesController.create);
        this.router.post('/', usuariosControllers_1.usuariosController.list);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
