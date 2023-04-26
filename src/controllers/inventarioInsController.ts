import { Request, Response } from 'express';

import db from '../database'
import pool from '../database';

class InventarioInsController {
    public async list(req: Request, res: Response) {
        const [almacenfin] = await pool.promise().query('SELECT id_inv_ins, insumo.nombre AS insumoInv, fecha_venc, cantidad_actual,  insumo.unidad AS unidad FROM maxisoft_db.inventario_insumo INNER JOIN insumo ON tipo_insumo = insumo.id_insumo ORDER BY cantidad_actual ASC;');
        res.json(almacenfin)
    }
    public async listesp(req: Request, res: Response) {
        const [almacenfin] = await pool.promise().query('SELECT  insumo.nombre, SUM(cantidad_actual) AS existencia, fecha_venc   FROM maxisoft_db.inventario_insumo INNER JOIN insumo ON tipo_insumo = insumo.id_insumo GROUP BY tipo_insumo;');
        res.json(almacenfin)
    }
    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const inventarioprod = await pool.promise().query('SELECT * FROM inventario_producto WHERE id_inv_insumo = ?', [id])
        if (inventarioprod.length > 0) {
            return res.json(inventarioprod[0]);
        }
        res.status(404).json({ text: "El producto no existe" })
        console.log(inventarioprod)
        res.json({ text: 'producto encontrado ' })
    }

    public create(req: Request, res: Response) {
        pool.query('INSERT INTO inventario_insumo set ?', [req.body])
        console.log(req.body);
        res.json({ message: 'producto guardado' })
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await pool.promise().query('DELETE FROM inventario_insumo WHERE id_inv_insumo = ?', [id])
        res.json({ message: 'Registro Eliminado' })
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.promise().query('UPDATE inventario_insumo set ? WHERE id_inv_ins= ?', [req.body, id])
        res.json({ message: 'Registro actualizando ' })
    }
}

export const inventarioinsController = new InventarioInsController();