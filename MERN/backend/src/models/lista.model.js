// Importamos las definiciones de modelo y schema desde mongoose
import { model, Schema, Types } from 'mongoose';

//MODELADO DE DATOS DEL ESQUEMA
const ListaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true, 
    },
    canciones: [{
        type: Types.ObjectId,
        ref: 'Album',
    }],
    }, {timestamps: true}
);


// Crea el modelo
const Listas = model("Listas", ListaSchema);

// Exporta el modelo para usarlo en tu aplicación
export default Listas;