import axios from "axios";
import { useState } from "react";

const CrearCanciones = () =>{

    const [addForm, setAddForm] = useState({});
    const [addErrors, setAddErrors] = useState({});

    const handleAdd= async () => {
        console.log(addForm);
        try {
            const response = await axios.post("/api/albums", addForm);//REALIZAR LA PETICIÓN DE CREACIÓN AL BACKEND
            const data = response.data; //CONVIERTE LA RESPUESTA
            const status = response.status; //OBTENEMOS EL ESTADO DE LA RESPUESTA
            console.log(data, status);  //VEMOS EN CONSOLA LA RESPUESTA
            setAddErrors({}); //LIMPIAMOS LOS ERRORES
            setAddForm({});
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setAddErrors(error.response.data.errors);  // Actualizar errores desde el backend
            } else {
                console.log(error);
            }
        }
    }

    return(
        <>
            <div className="cont-general">
                <div className="cont-caja">
                    <div className="cont-titulo">
                        <h1>Agregar Canciones</h1>
                    </div>
                    {/*CAMPO TITULO DE LA CANCION */}
                    <div className="cont-contenido">
                        <label className="labels">Título</label>
                        <input
                            type="text"
                            placeholder="Ingrese el título de la canción"
                            value={addForm.titulo || ""}
                            onChange={(e) => setAddForm({ ...addForm, titulo: e.target.value })}
                            style={{
                                border: addErrors.titulo ? "1px solid red" : "1px solid #ccc",
                                padding: "10px",
                                outline: "none",
                                borderRadius: "4px"
                            }}
                        />
                        {addErrors.titulo && (
                            <p style={{ color: "red", fontSize: "12px" }}>{addErrors.titulo}</p>
                        )}
                    </div>

                    {/*CAMPO AUTOR DE LA CANCION */}
                    <div className="cont-contenido">
                        <label className="labels">Artista</label>
                        <input
                            type="text"
                            placeholder="Ingrese el artista de la canción"
                            value={addForm.artista || ""}
                            onChange={(e) => setAddForm({ ...addForm, artista: e.target.value })}
                            style={{
                                border: addErrors.artista ? "1px solid red" : "1px solid #ccc",
                                padding: "10px",
                                outline: "none",
                                borderRadius: "4px"
                            }}
                        />
                        {addErrors.artista && (
                            <p style={{ color: "red", fontSize: "12px" }}>{addErrors.artista}</p>
                        )}
                    </div>
                    {/*CAMPO AÑO DE LANZAMIENTO */}
                    <div className="cont-contenido">
                        <label className="labels">Año de Lanzamiento</label>
                        <input
                            type="number"
                            placeholder="Ingrese el año de lanzamiento"
                            value={addForm.anoLanzamiento || ""}
                            onChange={(e) => setAddForm({ ...addForm, anoLanzamiento: e.target.value })}
                            style={{
                                border: addErrors.anoLanzamiento ? "1px solid red" : "1px solid #ccc",
                                padding: "10px",
                                outline: "none",
                                borderRadius: "4px"
                            }}
                        />
                        {addErrors.anoLanzamiento && (
                            <p style={{ color: "red", fontSize: "12px" }}>{addErrors.anoLanzamiento}</p>
                        )}
                    </div>
                    {/*CAMPO GÉNERO */}
                    <div className="cont-contenido">
                        <label className="labels">Género</label>
                        <input
                            type="text"
                            placeholder="Ingrese el género de la canción"
                            value={addForm.genero || ""}
                            onChange={(e) => setAddForm({ ...addForm, genero: e.target.value })}
                            style={{
                                border: addErrors.genero ? "1px solid red" : "1px solid #ccc",
                                padding: "10px",
                                outline: "none",
                                borderRadius: "4px"
                            }}
                        />
                        {addErrors.genero && (
                            <p style={{ color: "red", fontSize: "12px" }}>{addErrors.genero}</p>
                        )}
                    </div>
                    <button className='btn' onClick={handleAdd}>Agregar</button>   
                </div>
            </div>
        </>
    );
}

export default CrearCanciones;