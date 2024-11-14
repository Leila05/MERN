import Listas from '../models/lista.model.js';
import Album from '../models/album.model.js';

// Crear una nueva lista de reproducción
const crearListaReproduccion = async (req, res) => {
    const { nombre, canciones } = req.body; // canciones es un array de IDs

    try {
        // Verificar que todas las canciones existan
        const cancionesValidas = await Album.find({ '_id': { $in: canciones } });
        if (cancionesValidas.length !== canciones.length) {
            return res.status(400).send({ message: 'Algunas canciones no son válidas' });
        }

        const nuevaLista = new Listas({
            nombre,
            canciones,
        });

        await nuevaLista.save();
        res.status(201).send(nuevaLista);
    } catch (error) {
        console.error('Error al crear la lista:', error);
        res.status(500).send({ message: 'Error al crear la lista de reproducción' });
    }
};

// Obtener una lista de reproducción por ID
const obtenerListaReproduccion = async (req, res) => {
    try {
        const lista = await Listas.findById(req.params.id).populate('canciones');
        if (!lista) {
            return res.status(404).send({ message: 'Lista no encontrada' });
        }
        res.send(lista);
    } catch (error) {
        console.error('Error al obtener la lista:', error);
        res.status(500).send({ message: 'Error al obtener la lista de reproducción' });
    }
};

// Obtener todas las listas de reproducción
const obtenerListasReproduccion = async (req, res) => {
    try {
        const listas = await Listas.find().populate('canciones');
        res.send(listas);
    } catch (error) {
        console.error('Error al obtener las listas:', error);
        res.status(500).send({ message: 'Error al obtener las listas de reproducción' });
    }
};

export default {
    crearListaReproduccion,
    obtenerListaReproduccion,
    obtenerListasReproduccion,
};