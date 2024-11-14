import { useState, useEffect } from 'react';
import axios from 'axios';

const CrearListaReproduccion = () => {
    
    const [lista, setLista] = useState('');
    const [canciones, setCanciones] = useState([]);
    const [cancionesSeleccionadas, setCancionesSeleccionadas] = useState([]);

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

    const handleCheckboxChange = (idCancion) => {
        setCancionesSeleccionadas((prev) => {
            if (prev.includes(idCancion)) {
            return prev.filter((cancionId) => cancionId !== idCancion);
            } else {
            return [...prev, idCancion];
            }
        });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const nuevaLista = {
                nombre: lista,
                canciones: cancionesSeleccionadas,
            };

            await axios.post('/api/listas-reproduccion', nuevaLista);
            alert('Lista de reproducción creada exitosamente!');
            setLista('');
            setCancionesSeleccionadas([]);
        } catch (error) {
            console.error('Error al crear la lista de reproducción:', error);
        }
    };

    return (
        <>
            <div>
                <h2>Crear Lista de Reproducción</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre de la lista:</label>
                        <input
                            type="text"
                            value={lista}
                            onChange={(e) => setLista(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <h3>Selecciona las canciones:</h3>
                        {canciones.map((cancion) => (
                            <div key={cancion._id}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={cancionesSeleccionadas.includes(cancion._id)}
                                        onChange={() => handleCheckboxChange(cancion._id)}
                                    />
                                    {cancion.artista}
                                </label>
                            </div>
                        ))}
                    </div>

                    <button type="submit">Crear Lista</button>
                </form>
            </div>
        </>
    );
};

export default CrearListaReproduccion;