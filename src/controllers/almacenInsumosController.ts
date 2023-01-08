import { Request, Response } from 'express';

import db from '../database'
import pool from '../database';

class AlmacenInsumoController {
    public async list(req: Request, res: Response) {
        const [almaceninsumo] = await pool.promise().query('SELECT * FROM kardex_insumo ');
        res.json(almaceninsumo)
    }
    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const almaceninsumo = await pool.promise().query('SELECT * FROM kardex_insumo WHERE id_det_insumo = ?', [id])
        if (almaceninsumo.length > 0) {
            return res.json(almaceninsumo[0]);
        }
        res.status(404).json({ text: "El registro de insumo no existe" })
        console.log(almaceninsumo)
        res.json({ text: 'registro de insumo encontrado ' })
    }

    public create(req: Request, res: Response) {
        pool.query('INSERT INTO inventario_insumo set ?', [req.body])
        console.log(req.body);
        res.json({ message: 'registro de insumo guardado' })
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await pool.promise().query('DELETE FROM kardex_insumo WHERE id_det_insumo = ?', [id])
        res.json({ message: 'Registro Eliminado' })
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.promise().query('UPDATE kardex_insumo set ? WHERE id_det_insumo= ?', [req.body, id])
        res.json({ message: 'Registro actualizando ' })
    }
}

export const almacenInsumoController = new AlmacenInsumoController();