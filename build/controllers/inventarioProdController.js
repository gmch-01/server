"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventarioprodController = void 0;
const database_1 = __importDefault(require("../database"));
class InventarioProdController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [almacenfin] = yield database_1.default.promise().query('SELECT id_inv_producto, producto.nombre AS productoInv, fecha_vencimiento, cantidad_actual FROM inventario_producto INNER JOIN producto ON inventario_producto.tipo_prod = producto.id_producto ORDER BY cantidad_actual ASC;');
            res.json(almacenfin);
        });
    }
    listesp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [almacenfin] = yield database_1.default.promise().query('SELECT id_inv_producto, producto.nombre AS productoInv, fecha_vencimiento, SUM(cantidad_actual) AS existencia FROM inventario_producto INNER JOIN producto ON inventario_producto.tipo_prod = producto.id_producto GROUP BY producto.nombre;');
            res.json(almacenfin);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const inventarioprod = yield database_1.default.promise().query('SELECT * FROM inventario_producto WHERE id_det_producto = ?', [id]);
            if (inventarioprod.length > 0) {
                return res.json(inventarioprod[0]);
            }
            res.status(404).json({ text: "El producto no existe" });
            console.log(inventarioprod);
            res.json({ text: 'producto encontrado ' });
        });
    }
    create(req, res) {
        database_1.default.query('INSERT INTO inventario_producto set ?', [req.body]);
        console.log(req.body);
        res.json({ message: 'producto guardado' });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('DELETE FROM inventario_producto WHERE id_det_producto = ?', [id]);
            res.json({ message: 'Registro Eliminado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('UPDATE inventario_producto set ? WHERE id_det_producto= ?', [req.body, id]);
            res.json({ message: 'Registro actualizando ' });
        });
    }
}
exports.inventarioprodController = new InventarioProdController();
