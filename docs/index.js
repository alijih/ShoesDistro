const express= require ('express');
const mongoose =require ('mongoose');
const bodyparser=require ('body-parser');
const { env } = require('process');
require('dotenv').config();
const app = express();
const {v4: uuidv4}  = require('uuid')
const multer = require('multer')


//capturar body
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.raw());

//cors SIEMPRE DSP DEL EXPRESS XQ LO OCUPA
const cors=require('cors');//llamo el cors
var corsOptions = {
     origin:'*',//reemplazar con dominio, donde esta el origen del servidor del frontend
     optionsSuccessStatus:200//para algunos navegadores
}
app.use(cors(corsOptions));



// CONECTO BASE DE DATOS 
// url de donde esta la base de datos, la saco de mongo
//const uri= `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.84inm.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
const uri=`mongodb://${process.env.USER}:${process.env.PASSWORD}@dbshoes-shard-00-00.usxne.mongodb.net:27017,dbshoes-shard-00-01.usxne.mongodb.net:27017,dbshoes-shard-00-02.usxne.mongodb.net:27017/${process.env.DBNAME}?ssl=true&replicaSet=atlas-glz6i3-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology:true
    })
    .then (()=>console.log('Base de datos conectada'))
    .catch(e=>console.log('error db:',e))

//IMPORTO LAS RUTAS DE USER.JS
const UsersRoutes=require('./routes/users');
const ShoesRoutes=require('./routes/shoes');
//const validaToken=require('./routes/validate-token');



//RUTA MIDDLEWARES
app.use('/api/user',UsersRoutes);
app.use('/api/shoes',ShoesRoutes)

// app.use('/api/agent/addpyme', validatetoken,addpyme); si token valida pasa a addpyme



//puerto donde se inicia el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`servidor andando en : ${PORT}`)
})