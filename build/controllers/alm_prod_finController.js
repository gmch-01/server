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
exports.almacenfinController = void 0;
const database_1 = __importDefault(require("../database"));
class AlmacenFinController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [almacenfin] = yield database_1.default.promise().query('SELECT * FROM inventario_producto ');
            res.json(almacenfin);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const almacenfin = yield database_1.default.promise().query('SELECT * FROM inventario_producto WHERE id_inv_producto = ?', [id]);
            if (almacenfin.length > 0) {
                return res.json(almacenfin[0]);
            }
            res.status(404).json({ text: "El producto no existe" });
            console.log(almacenfin);
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
            yield database_1.default.promise().query('DELETE FROM inventario_producto WHERE id_inv_producto = ?', [id]);
            res.json({ message: 'Registro Eliminado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('UPDATE inventario_producto set ? WHERE id_inv_producto= ?', [req.body, id]);
            res.json({ message: 'Registro actualizando ' });
        });
    }
}
exports.almacenfinController = new AlmacenFinController();
