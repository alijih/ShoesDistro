//llamo a las rutas de express SIEMPRE PRIMERO
const router = require('express').Router();
//llamo el schema de shoes
const Shoes = require('../models/Shoes');
const fetch = require('node-fetch');
const { resolveContent } = require('nodemailer/lib/shared');
async function cott() {
    let cott = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
    while (cott == null) {
        if (cott != null) { return cott }
    }
}


router.post('/AddShoe', async (req, res) => {
    let newshoe = req.body;

    fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
        .then(web =>web.json())
        .then(json=>{
            let dolarBlue=parseFloat(json[1].casa.compra)
            newshoe.precio_mayorista = (newshoe.precio_costo + (newshoe.gananciamay * newshoe.precio_costo / 100)) * dolarBlue;
            newshoe.precio_minorista = (newshoe.precio_costo + (newshoe.gananciamin * newshoe.precio_costo / 100)) * dolarBlue;

            const Show = new Shoes({
                marca: newshoe.marca,
                modelo: newshoe.modelo,
                talle: newshoe.talle,
                color: newshoe.color,
                genero: newshoe.genero,
                stock_real:newshoe.stock_real,
                stock_posible:newshoe.stock_posible,
                precio_costo: newshoe.precio_costo,
                precio_mayorista: newshoe.precio_mayorista,
                precio_minorista: newshoe.precio_minorista
            })
            const guardado = Show.save()
            return res.json({
                error: false,
                data: guardado
            })
        })
})

// EXPORTO LA RUTA DE REGISTRO
module.exports = router;