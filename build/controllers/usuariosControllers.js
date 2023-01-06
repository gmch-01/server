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
exports.usuariosController = void 0;
const database_1 = __importDefault(require("../database"));
class UsuariosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [insumos] = yield database_1.default.promise().query('SELECT * FROM usuario');
            res.json(insumos);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const insumo = yield database_1.default.promise().query('SELECT * FROM usuario WHERE ci_persona = ?', [id]);
            if (insumo.length > 0) {
                return res.json(insumo[0]);
            }
            res.status(404).json({ text: "El juego no existe" });
            console.log(insumo);
            res.json({ text: 'juego encontrado ' });
        });
    }
    create(req, res) {
        database_1.default.query('INSERT INTO insumo set ?', [req.body]);
        console.log(req.body);
        res.json({ message: 'insumo guardado' });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('DELETE FROM insumo WHERE id_insumo = ?', [id]);
            res.json({ message: 'Juego Eliminado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.promise().query('UPDATE insumo set ? WHERE id_insumo= ?', [req.body, id]);
            res.json({ message: 'insumo actualizando ' });
        });
    }
}
exports.usuariosController = new UsuariosController();
