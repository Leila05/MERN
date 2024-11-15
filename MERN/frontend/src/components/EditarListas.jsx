import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditarListas = () =>{

    const { id } = useParams(); // Obtener el ID de la lista de reproducción desde la URL
    const navigate = useNavigate();
    const [lista, setLista] = useState('');
    const [canciones, setCanciones] = useState([]);
    const [cancionesSeleccionadas, setCancionesSeleccionadas] = useState([]);

    useEffect(() => {
        // Cargar todas las canciones
        const fetchCanciones = async () => {
            try {
                const response = await axios.get('/api/albums');
                if (Array.isArray(response.data)) {
                    setCanciones(response.data);
                } else {
                    console.error('La respuesta no es un array:', response.data);
                }
            } catch (error) {
                console.error('Error al obtener las canciones:', error);
            }
        };

        // Cargar los datos de la lista de reproducción para editar
        const fetchListaReproduccion = async () => {
            try {
                const response = await axios.get(`/api/listas-reproduccion/${id}`);
                const { nombre, canciones } = response.data;
                setLista(nombre); // Establece el nombre de la lista
                setCancionesSeleccionadas(canciones); // Establece las canciones seleccionadas
            } catch (error) {
                console.error('Error al obtener la lista de reproducción:', error);
            }
        };

        fetchCanciones();
        fetchListaReproduccion();
    }, [id]);

    const handleCheckboxChange = (idCancion) => {
        setCancionesSeleccionadas((prev) => {
            if (prev.includes(idCancion)) {
                return prev.filter((cancionId) => cancionId !== idCancion);
            } else {
                return [...prev, idCancion];
            }
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const listaActualizada = {
                nombre: lista,
                canciones: cancionesSeleccionadas,
            };

            await axios.put(`/api/listas-reproduccion/${id}`, listaActualizada);
            alert('Lista de reproducción actualizada exitosamente!');
            navigate('/listas-reproduccion'); // Redirige al inicio después de editar
        } catch (error) {
            console.error('Error al actualizar la lista de reproducción:', error);
        }
    };

    return (
        <>
            <div>
                <h2>Editar Lista de Reproducción</h2>
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

                    <button type="submit" id="Btneditar">Guardar Cambios</button>
                </form>
            </div>
        </>
    );
};

export default EditarListas;