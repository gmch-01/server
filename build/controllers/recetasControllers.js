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
exports.recetasController = void 0;
const database_1 = __importDefault(require("../database"));
class RecetasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [receta] = yield database_1.default.promise().query('SELECT id_receta, producto.nombre AS producto,  insumo.nombre AS insumo, receta.cantidad, insumo.unidad AS unidad  FROM receta INNER JOIN (producto, insumo) WHERE receta.id_producto = producto.id_producto AND receta.id_insumo = insumo.id_insumo;');
            res.json(receta);
        });
    }
    listEsp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [receta] = yield database_1.default.promise().query('SELECT MIN(receta.id_receta) AS id_receta, producto.nombre AS producto FROM receta INNER JOIN producto ON receta.id_producto = producto.id_producto GROUP BY producto.nombre;');
            res.json(receta);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const receta = yield database_1.default.promise().query('SELECT * FROM producto WHERE id_receta = ?', [id]);
            if (receta.length > 0) {
                return res.json(receta[0]);
            }
            res.status(404).json({ text: "El receta no existe" });
            console.log(receta);
            res.json({ text: 'receta encontrado ' });
        });
    }
    create(req, res) {
        database_1.default.query('INSERT INTO receta set ?', [req.body]);
        console.log(req.body);
        res.json({ message: 'receta guardado' });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('DELETE FROM receta WHERE id_receta = ?', [id]);
            res.json({ message: 'receta Eliminado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('UPDATE receta set ? WHERE id_receta= ?', [req.body, id]);
            res.json({ message: 'receta actualizando ' });
        });
    }
}
exports.recetasController = new RecetasController();
