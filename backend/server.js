//Importamos el módulo de express
import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/mongoose.config.js';
import cors from 'cors';

import cancionRoute from './src/routes/canciones.routes.js';
import listasRoute from './src/routes/lista.route.js';


//Creamos una instancia de la aplicación express
const app = express();
dotenv.config(); 

const port = process.env.PORT;
app.use(express.json());

//CONFIGURACION DE POLITICAS DE ORIGEN CRUZADO
app.use(cors(
    {
        origin: ['http://localhost:5173']
    }
));


app.use('/api/albums', cancionRoute);
app.use('/api/listas-reproduccion',listasRoute);

conectarDB();

// Configuramos el servidor para que escuche en el puerto especificado
// y ejecutamos una función callback que muestra un mensaje en la consola
app.listen(port, () => {
    console.log(`El servidor está activo en el puerto: ${port}`);
});