import { useState, useEffect } from 'react';
import axios from 'axios';

const BibliotecaMusica = () => {

    const [canciones, setCanciones] = useState([]);
    const [filtro, setFiltro] = useState('');

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

    if (canciones.length === 0) {
        return <div>Cargando canciones...</div>;
    }

    return (
        <div className='general'>
            <div className='titulo'>
                <h2>Todas las canciones</h2>
            </div>
            <div className='filtro'>
                <input
                    type="text" 
                    placeholder="Buscar canción..." 
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)} 
                />
            </div>
            
            <div className='box'>    
                <ul className='caja'>
                    {canciones.filter((cancion) => 
                        cancion.titulo.toLowerCase().includes(filtro.toLowerCase()) || 
                        cancion.artista.toLowerCase().includes(filtro.toLowerCase()))
                        .map((cancion) => (
                            <li className='contenido' key={cancion._id}>
                                <div className='contenido-text'>
                                    <h3>{cancion.titulo}</h3>
                                    <p><strong>Artista:</strong> {cancion.artista}</p>
                                    <p><strong>Año de lanzamiento:</strong> {cancion.anoLanzamiento}</p>
                                    <p><strong>Género:</strong> {cancion.genero}</p>
                                </div>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </div>
    );
};

export default BibliotecaMusica;