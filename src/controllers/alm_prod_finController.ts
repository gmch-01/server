import { Request, Response } from 'express';

import db from '../database'
import pool from '../database';

class AlmacenFinController {
    public async list(req: Request, res: Response) {
        const [almacenfin] = await pool.promise().query('SELECT kardex_producto.fecha_registro, kardex_producto.cantidad, producto.nombre AS producto, kardex_producto.encargado, kardex_producto.fecha_vencimiento FROM maxisoft_db.kardex_producto INNER JOIN producto WHERE kardex_producto.id_producto = producto.id_producto;');
        res.json(almacenfin)
    }
    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const almacenfin = await pool.promise().query('SELECT * FROM kardex_producto WHERE id_det_producto = ?', [id])
        if (almacenfin.length > 0) {
            return res.json(almacenfin[0]);
        }
        res.status(404).json({ text: "El producto no existe" })
        console.log(almacenfin)
        res.json({ text: 'producto encontrado ' })
    }

    public create(req: Request, res: Response) {
        pool.query('INSERT INTO kardex_producto set ?', [req.body])
        console.log(req.body);
        res.json({ message: 'producto guardado' })
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await pool.promise().query('DELETE FROM kardex_producto WHERE id_det_producto = ?', [id])
        res.json({ message: 'Registro Eliminado' })
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.promise().query('UPDATE kardex_producto set ? WHERE id_det_producto= ?', [req.body, id])
        res.json({ message: 'Registro actualizando ' })
    }
}

export const almacenfinController = new AlmacenFinController();