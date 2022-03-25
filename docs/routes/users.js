//llamo a las rutas de express SIEMPRE PRIMERO
const router =require ('express').Router();
//llamo el schema de usuario
const User=require('../models/User');
//importo bcrypt 
const bcrypt=require('bcrypt');
//importo jwt 
const jwt=require('jsonwebtoken');



//validaciones del modelo
const Joi=require('@hapi/joi');

//validaciones para register
const schemaRegister=Joi.object({
    name: Joi.string().min(2).max(255).required(),
    lastname: Joi.string().min(2).max(255).required(),
    nickname: Joi.string().min(4).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    rol: Joi.number().min(0).max(4).required(),
    password: Joi.string().min(6).max(1024).required()
})
//validaciones para login
const schemaLogin=Joi.object({
    NicknameEmail: Joi.string().min(2).max(255).required(),
    password: Joi.string().min(6).max(1024).required()
})





//CREO LA RUTA DE REGISTRO
router.post('/register', async (req, res)=>{
    const {error}=schemaRegister.validate(req.body);
    if (error){
       return res.status(400).json({error: error.details[0].message})
    }

    const existemail=await User.findOne({email:req.body.email})//true si existe
    if(existemail){return res.status(400).json({error: true,mensaje:"email ya registrado"})}

    const existenickname=await User.findOne({nickname:req.body.nickname})//true si existe
    if(existenickname){return res.status(400).json({error: true,mensaje:"nickname en uso"})}

    //encripto la contraseña
    const saltos= await bcrypt.genSalt(10);
    const passwordbody=await bcrypt.hash(req.body.password, saltos);

    const user = new User ({
        name: req.body.name,
        lastname: req.body.lastname,
        nickname: req.body.nickname,
        rol: req.body.rol,
        email: req.body.email,
        password: passwordbody    
    })

    try {
        const userDB = await user.save();
        res.json({
            error:null,
            mensaje: userDB
        })
        
    } catch (error) {
        res.status(400).json({error})
    }
})




//LOGIN
router.post('/login', async (req, res) => {
    const {error}=schemaLogin.validate(req.body);
    if (error){
       return res.status(400).json({error: error.details[0].message})
    }
    var existe;

    existe=await User.findOne({email:req.body.NicknameEmail})//true si existe
    if(!existe){
        existe=await User.findOne({nickname:req.body.NicknameEmail})//true si existe
        if(!existe){return res.status(400).json({error: true,mensaje:"email o nickname invalid"})
                    }
    }


  
    const comparepassword=await bcrypt.compare(req.body.password, existe.password)//true si existe
    if(!comparepassword){return res.status(400).json({error: true,mensaje:"password invalid"})}

    const token= jwt.sign({
        id : existe._id,
        nickname  : existe.nickname,   
        email: existe.email,
        rol: existe.rol   
    },process.env.TOKEN_SECRET)

    // res.json ({
    //     error: false,
    //     message: "adentro",
    //     token: token
    // })

    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })

})


// EXPORTO LA RUTA DE REGISTRO
module.exports =router;

 