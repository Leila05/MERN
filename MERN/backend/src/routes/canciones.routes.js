import express from 'express';

import albumController from '../controllers/cancion.controller.js';

const router = express.Router();

router.post('/', albumController.agregarCanciones);
router.get('/', albumController.obtenerCanciones);
router.get('/:id', albumController.obtenerCancionesId);
router.put('/:id', albumController.editarCanciones);
router.delete('/:id', albumController.eliminarCanciones);

export default router;