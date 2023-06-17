import { Request, Response } from 'express';

import db from '../database'
import pool from '../database';

class HojaProdController {
    public async list(req: Request, res: Response) {
        const [hojaprod] = await pool.promise().query('SELECT hoja_de_produccion.id_hoja_produccion , producto.nombre AS receta, hoja_de_produccion.cantidad, hoja_de_produccion.fecha_hoja, hoja_de_produccion.encargado, hoja_de_produccion.progreso, hoja_de_produccion.peso_recibido, hoja_de_produccion.embolsado FROM hoja_de_produccion INNER JOIN receta ON hoja_de_produccion.id_receta = receta.id_receta INNER JOIN producto ON receta.id_producto = producto.id_producto ORDER BY hoja_de_produccion.id_hoja_produccion DESC ');
        res.json(hojaprod)
    }

    public async listesp(req: Request, res: Response) {
        const [hojaprod] = await pool.promise().query('SELECT hoja_de_produccion.id_hoja_produccion,producto.nombre AS receta,hoja_de_produccion.cantidad, hoja_de_produccion.fecha_hoja,hoja_de_produccion.encargado,hoja_de_produccion.progreso,hoja_de_produccion.peso_recibido, hoja_de_produccion.embolsado,(SELECT COUNT(*) FROM hoja_de_produccion WHERE STR_TO_DATE(fecha_hoja, "%Y-%m-%d") = CURDATE()) AS recetas_hoy FROM hoja_de_produccion INNER JOIN receta ON hoja_de_produccion.id_receta = receta.id_receta INNER JOIN producto ON receta.id_producto = producto.id_producto WHERE STR_TO_DATE(fecha_hoja, "%Y-%m-%d") = CURDATE() AND progreso >= 20;');
        res.json(hojaprod)
    }
    
    public async hoydesp(req: Request, res: Response) {
        const [hojaprod] = await pool.promise().query('SELECT hoja_de_produccion.id_hoja_produccion,producto.nombre AS receta,hoja_de_produccion.cantidad, hoja_de_produccion.fecha_hoja,hoja_de_produccion.encargado,hoja_de_produccion.progreso,hoja_de_produccion.peso_recibido, hoja_de_produccion.embolsado,(SELECT COUNT(*) FROM hoja_de_produccion WHERE STR_TO_DATE(fecha_hoja, "%Y-%m-%d") = CURDATE()) AS recetas_hoy FROM hoja_de_produccion INNER JOIN receta ON hoja_de_produccion.id_receta = receta.id_receta INNER JOIN producto ON receta.id_producto = producto.id_producto WHERE STR_TO_DATE(fecha_hoja, "%Y-%m-%d") = CURDATE()');
        res.json(hojaprod)
    }
    public async hoyrec(req: Request, res: Response) {
        const [hojaprod] = await pool.promise().query('SELECT hoja_de_produccion.id_hoja_produccion, producto.nombre AS receta, hoja_de_produccion.cantidad, hoja_de_produccion.fecha_hoja, hoja_de_produccion.encargado, hoja_de_produccion.progreso, hoja_de_produccion.peso_recibido, hoja_de_produccion.embolsado, cantidad_bolsa, peso_receta, (SELECT COUNT(*) FROM hoja_de_produccion WHERE STR_TO_DATE(fecha_hoja, "%Y-%m-%d") = CURDATE()) AS recetas_hoy, ROUND((embolsado / cantidad_bolsa) * 100, 2) AS porcentaje_embolsado, ROUND((peso_recibido / peso_receta) * 100, 2) AS porcentaje_peso_recibido FROM hoja_de_produccion INNER JOIN receta ON hoja_de_produccion.id_receta = receta.id_receta INNER JOIN producto ON receta.id_producto = producto.id_producto WHERE STR_TO_DATE(fecha_hoja, "%Y-%m-%d") = CURDATE() AND progreso >= 20;');
        res.json(hojaprod)
    }










    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const hojaprod = await pool.promise().query('SELECT * FROM hoja_de_produccion WHERE id_hoja_produccion = ?', [id])
        if (hojaprod.length > 0) {
            return res.json(hojaprod[0]);
        }
        res.status(404).json({ text: "El producto no existe" })
        console.log(hojaprod)
        res.json({ text: 'producto encontrado ' })
    }

    public create(req: Request, res: Response) {
        pool.query('INSERT INTO hoja_de_produccion set ?', [req.body])
        console.log(req.body);
        res.json({ message: 'producto guardado' })
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await pool.promise().query('DELETE FROM hoja_de_produccion WHERE id_hoja_produccion = ?', [id])
        res.json({ message: 'Registro Eliminado' })
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.promise().query('UPDATE hoja_de_produccion set ? WHERE id_hoja_produccion= ?', [req.body, id])
        res.json({ message: 'Registro actualizando ' })
    }
}

export const hojaprodController = new HojaProdController();