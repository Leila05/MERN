import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Musicas = () => {

    const [canciones, setCanciones] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCanciones = async () => {
            try {
                const response = await axios.get('/api/albums');
                console.log('Respuesta de la API:', response.data);
                if (Array.isArray(response.data)) {
                    setCanciones(response.data);
                } else {
                    console.error('La respuesta no es un array:', response.data);
                }
            } catch (error) {
                console.error('Error al obtener las canciones:', error);
            }
        };

        fetchCanciones();
    }, []);

    const handleEliminar = async (id) => {
        try {
            await axios.delete(`/api/albums/${id}`);
            setCanciones(canciones.filter((cancion) => cancion._id !== id));
            console.log(`Canción con ID ${id} eliminada`);
            navigate('/');
        } catch (error) {
            console.error('Error al eliminar la canción:', error);
        }
    };

    const handleEditar = (id) => {
        console.log(`Editando canción con ID ${id}`);
        navigate(`/editar-canciones/${id}`)
    };

    if (canciones.length === 0) {
        return <div>Cargando canciones...</div>;
    }

    return (
        <div className='general'>
            <div className='titulo'>
                <h2>Todas las canciones</h2>
            </div>
            
            <div className='box'>    
                <ul className='caja'>
                    {canciones.map((cancion) => (
                        <li className='contenido' key={cancion._id}>
                            <div className='contenido-text'>
                                <h3>{cancion.titulo}</h3>
                                <p><strong>Artista:</strong> {cancion.artista}</p>
                                <p><strong>Año de lanzamiento:</strong> {cancion.anoLanzamiento}</p>
                                <p><strong>Género:</strong> {cancion.genero}</p>
                            </div>
                            <button id="Btneditar" onClick={() => handleEditar(cancion._id)}>Editar</button>
                            <button id='Btneliminar' onClick={() => handleEliminar(cancion._id)}>Eliminar</button>
                        </li>
                        )
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Musicas;