import Album from "../models/album.model.js";

// Agregar una nueva canción
const agregarCanciones = async (req, res) => {
    try {
        const newAlbum = new Album(req.body);
        await newAlbum.save();
        res.status(201).json(newAlbum);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Recuperar todas las canciones
const obtenerCanciones = async (req, res) => {
    try {
        const albums = await Album.find();
        res.json(albums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Recuperar una canción específica
const obtenerCancionesId = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) return res.status(404).json({ message: 'Canción no encontrada' });
        res.json(album);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Editar una canción
const editarCanciones = async (req, res) => {
    try {
        const updatedAlbum = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedAlbum) return res.status(404).json({ message: 'Canción no encontrada' });
        res.json(updatedAlbum);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una canción
const eliminarCanciones = async (req, res) => {
    try {
        const deletedAlbum = await Album.findByIdAndDelete(req.params.id);
        if (!deletedAlbum) return res.status(404).json({ message: 'Canción no encontrada' });
        res.json({ message: 'Canción eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    agregarCanciones,
    obtenerCanciones,
    obtenerCancionesId,
    editarCanciones,
    eliminarCanciones
}