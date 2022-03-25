const { boolean } = require('@hapi/joi');
const mongoose = require('mongoose');


const ShoesSchema = mongoose.Schema({
    marca: {type: String,required: true},
    modelo: {type: String,required: true},
    talle: {type: Number,required: true},
    color: {type: String,required: true},
    genero: {type: String,required: true},
    stock_real:{type: Number,required: true},
    stock_posible:{type: Number,required: true},
    precio_costo: {type: Number,required: true},
    precio_mayorista: {type: Number,required: true},
    precio_minorista: {type: Number,required: true}
})

module.exports = mongoose.model('Shoes', ShoesSchema);
