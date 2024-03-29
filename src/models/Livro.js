import mongoose from "mongoose";
import {autorSchema} from "./Autor.js";


const livroSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    titulos: {type: String, required: true},
    autor: autorSchema,
},{versionKey: false});

const livro = mongoose.model("livro", livroSchema);

export default livro;

// Modelo é um objeto que representa uma coleção no banco de dados.