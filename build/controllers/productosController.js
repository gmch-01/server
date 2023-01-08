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
exports.productosController = void 0;
const database_1 = __importDefault(require("../database"));
class ProductosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [producto] = yield database_1.default.promise().query('SELECT * FROM producto');
            res.json(producto);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const producto = yield database_1.default.promise().query('SELECT * FROM producto WHERE id_producto = ?', [id]);
            if (producto.length > 0) {
                return res.json(producto[0]);
            }
            res.status(404).json({ text: "El producto no existe" });
            console.log(producto);
            res.json({ text: 'producto encontrado ' });
        });
    }
    create(req, res) {
        database_1.default.query('INSERT INTO producto set ?', [req.body]);
        console.log(req.body);
        res.json({ message: 'Producto guardado' });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('DELETE FROM producto WHERE id_producto = ?', [id]);
            res.json({ message: 'Producto Eliminado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('UPDATE producto set ? WHERE id_producto= ?', [req.body, id]);
            res.json({ message: 'Producto actualizando ' });
        });
    }
}
exports.productosController = new ProductosController();
