import { request, Request, Response } from 'express';

import db from '../database'
import pool from '../database';

class RecetasController {
    public async list(req: Request, res: Response) {
        const [receta] = await pool.promise().query('SELECT id_receta, producto.nombre AS producto,  insumo.nombre AS insumo, receta.cantidad, insumo.unidad AS unidad  FROM receta INNER JOIN (producto, insumo) WHERE receta.id_producto = producto.id_producto AND receta.id_insumo = insumo.id_insumo;');
        res.json(receta)
    }
    public async listEsp(req: Request, res: Response) {
        const [receta] = await pool.promise().query('SELECT MIN(receta.id_receta) AS id_receta, producto.nombre AS producto FROM receta INNER JOIN producto ON receta.id_producto = producto.id_producto GROUP BY producto.nombre;');
        res.json(receta)
    }


    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const receta = await pool.promise().query('SELECT * FROM producto WHERE id_receta = ?', [id])
        if (receta.length > 0) {
            return res.json(receta[0]);
        }
        res.status(404).json({ text: "El receta no existe" })
        console.log(receta)
        res.json({ text: 'receta encontrado ' })
    }

    public create(req: Request, res: Response) {
        pool.query('INSERT INTO receta set ?', [req.body])
        console.log(req.body);
        res.json({ message: 'receta guardado' })
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        await pool.promise().query('DELETE FROM receta WHERE id_receta = ?', [id])
        res.json({ message: 'receta Eliminado' })
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.promise().query('UPDATE receta set ? WHERE id_receta= ?', [req.body, id])
        res.json({ message: 'receta actualizando ' })
    }
}

export const recetasController = new RecetasController();