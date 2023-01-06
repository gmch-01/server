"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexControllers_1 = require("../controllers/indexControllers");
const usuariosControllers_1 = require("../controllers/usuariosControllers");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', indexControllers_1.indexController.index);
        this.router.post('/', usuariosControllers_1.usuariosController.create);
    }
}
const usuariosRoutes = new IndexRoutes();
exports.default = usuariosRoutes.router;
