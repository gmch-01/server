import { Request, Response } from 'express';

import db from '../database'
import pool from '../database';

class UsuariosController {
    public async list(req: Request, res: Response) {
        const [insumos] = await pool.promise().query('SELECT * FROM usuario');
        res.json(insumos)
    }
    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const insumo = await pool.promise().query('SELECT * FROM usuario WHERE ci_persona = ?', [id])
        if (insumo.length > 0) {
            return res.json(insumo[0]);
        }
        res.status(404).json({ text: "El juego no existe" })
        console.log(insumo)
        res.json({ text: 'juego encontrado ' })
    }

    public create(req: Request, res: Response) {
        pool.query('INSERT INTO insumo set ?', [req.body])
        console.log(req.body);
        res.json({ message: 'insumo guardado' })
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await pool.promise().query('DELETE FROM insumo WHERE id_insumo = ?', [id])
        res.json({ message: 'Juego Eliminado' })
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.promise().query('UPDATE insumo set ? WHERE id_insumo= ?', [req.body, id])
        res.json({ message: 'insumo actualizando ' })
    }
}

export const usuariosController = new UsuariosController();