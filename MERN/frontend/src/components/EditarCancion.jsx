import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditarCanciones = () =>{

    const { id } = useParams(); // Obtener el ID de la canción desde la URL
    const navigate = useNavigate(); // Para redirigir después de editar
    const [editForm, setEditForm] = useState({});
    const [editErrors, setEditErrors] = useState({});

    // Obtener la canción por ID cuando se carga el componente
    useEffect(() => {
        const fetchCancion = async () => {
            try {
                const response = await axios.get(`/api/albums/${id}`);
                setEditForm(response.data);
            } catch (error) {
                console.error("Error al obtener la canción:", error);
            }
        };
        fetchCancion();
    }, [id]);

    const handleEdit = async () => {
        try {
            const response = await axios.put(`/api/albums/${id}`, editForm); // Realizar la solicitud de actualización al backend
            console.log("Canción actualizada:", response.data);
            setEditErrors({});
            navigate("/"); // Redirigir al inicio después de la edición
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setEditErrors(error.response.data.errors); // Actualizar errores desde el backend
            } else {
                console.error("Error al editar la canción:", error);
            }
        }
    };

    return(
        <>
            <div className="cont-general">
                <div className="cont-caja">
                    <div className="cont-titulo">
                        <h1>Editar Canciones</h1>
                    </div>
                    {/*CAMPO TITULO DE LA CANCION */}
                    <div className="cont-contenido">
                        <label className="labels">Título</label>
                        <input
                            type="text"
                            placeholder="Ingrese el título de la canción"
                            value={editForm.titulo || ""}
                            onChange={(e) => setEditForm({ ...editForm, titulo: e.target.value })}
                            style={{
                                border: editErrors.titulo ? "1px solid red" : "1px solid #ccc",
                                padding: "10px",
                                outline: "none",
                                borderRadius: "4px"
                            }}
                        />
                        {editErrors.titulo && (
                            <p style={{ color: "red", fontSize: "12px" }}>{editErrors.titulo}</p>
                        )}
                    </div>

                    {/*CAMPO AUTOR DE LA CANCION */}
                    <div className="cont-contenido">
                        <label className="labels">Artista</label>
                        <input
                            type="text"
                            placeholder="Ingrese el artista de la canción"
                            value={editForm.artista || ""}
                            onChange={(e) => setEditForm({ ...editForm, artista: e.target.value })}
                            style={{
                                border: editErrors.artista ? "1px solid red" : "1px solid #ccc",
                                padding: "10px",
                                outline: "none",
                                borderRadius: "4px"
                            }}
                        />
                        {editErrors.artista && (
                            <p style={{ color: "red", fontSize: "12px" }}>{editErrors.artista}</p>
                        )}
                    </div>
                    {/*CAMPO AÑO DE LANZAMIENTO */}
                    <div className="cont-contenido">
                        <label className="labels">Año de Lanzamiento</label>
                        <input
                            type="number"
                            placeholder="Ingrese el año de lanzamiento"
                            value={editForm.anoLanzamiento || ""}
                            onChange={(e) => setEditForm({ ...editForm, anoLanzamiento: e.target.value })}
                            style={{
                                border: editErrors.anoLanzamiento ? "1px solid red" : "1px solid #ccc",
                                padding: "10px",
                                outline: "none",
                                borderRadius: "4px"
                            }}
                        />
                        {editErrors.anoLanzamiento && (
                            <p style={{ color: "red", fontSize: "12px" }}>{editErrors.anoLanzamiento}</p>
                        )}
                    </div>
                    {/*CAMPO GÉNERO */}
                    <div className="cont-contenido">
                        <label className="labels">Género</label>
                        <input
                            type="text"
                            placeholder="Ingrese el género de la canción"
                            value={editForm.genero || ""}
                            onChange={(e) => setEditForm({ ...editForm, genero: e.target.value })}
                            style={{
                                border: editErrors.genero ? "1px solid red" : "1px solid #ccc",
                                padding: "10px",
                                outline: "none",
                                borderRadius: "4px"
                            }}
                        />
                        {editErrors.genero && (
                            <p style={{ color: "red", fontSize: "12px" }}>{editErrors.genero}</p>
                        )}
                    </div>
                    <button id="Btneditar" onClick={handleEdit}>Guardar Cambios</button>   
                </div>
            </div>
        </>
    );
}

export default EditarCanciones;