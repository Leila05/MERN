import express from 'express';

import listasController from '../controllers/lista.controller.js';

const router = express.Router();

// Ruta para crear una nueva lista de reproducción
router.post('/', listasController.crearListaReproduccion);

// Ruta para obtener una lista de reproducción por ID
router.get('/:id', listasController.obtenerListaReproduccion);

// Ruta para obtener todas las listas de reproducción
router.get('/', listasController.obtenerListasReproduccion);

export default router;