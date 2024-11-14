// Importamos las definiciones de modelo y schema desde mongoose
import { model, Schema } from 'mongoose';

//MODELADO DE DATOS DEL ESQUEMA
const AlbumSchema = new Schema({
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio.'],
        minlength: [6, 'El título debe tener al menos 6 caracteres.'],
        maxlength: [255, 'El título no puede tener más de 255 caracteres.']
    },
    artista: {
        type: String,
        required: [true, 'El nombre del artista es obligatorio.'],
        minlength: [10, 'El nombre del artista debe tener al menos 10 caracteres.'],
        maxlength: [255, 'El nombre del artista no puede tener más de 255 caracteres.']
    },
    anoLanzamiento:{
        type: Number,
        required: [true, 'El año de lanzamiento es obligatorio.'],
        validate: {
            validator: function(v) {
                return /^[0-9]{4}$/.test(v.toString());
            },
            message: 'El año de lanzamiento debe tener exactamente 4 dígitos.'
        }
    },
    genero: {
        type: String,
        required: [true, 'El género es obligatorio.']
    }
}, { timestamps: true });


// Crea el modelo de User
const Album = model("Album", AlbumSchema);

// Exporta el modelo para usarlo en tu aplicación
export default Album;