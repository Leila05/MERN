import { useState, useEffect } from 'react';
import axios from 'axios';

const ListasReproduccion = () => {
    
    const [listas, setListas] = useState([]);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        const fetchListas = async () => {
            try {
                const response = await axios.get('/api/listas-reproduccion');
                console.log('Respuesta de la API:', response.data);
                if (Array.isArray(response.data)) {
                    setListas(response.data);
                } else {
                    console.error('La respuesta no es un array:', response.data);
                }
            } catch (error) {
                console.error('Error al obtener las canciones:', error);
            }
        };

        fetchListas();
    }, []);

    if (listas.length === 0) {
        return <div>Cargando listas de reproduccion...</div>;
    }


    return (
        <div className='general'>
            <div className='titulo'>
                <h2>Todas las listas de reproducciones</h2>
            </div>
            <div className='filtro'>
                <input
                    type="text" 
                    placeholder="Buscar una lista..." 
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)} 
                />
            </div>
            
            <div className='box'>    
                <ul className='caja'>
                    {listas.filter((lista) => 
                        lista.nombre.toLowerCase().includes(filtro.toLowerCase()))
                        .map((lista) => (
                            <li className='contenido' key={lista._id}>
                                <div className='contenido-text'>
                                    <h3>{lista.nombre}</h3>
                                </div>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </div>
    );
};


export default ListasReproduccion;