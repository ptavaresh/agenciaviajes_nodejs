import { Testimoniales } from '../models/Testimoniales.js';

const guardarTestimonial = async (req, res) => {
    // validar
    const { nombre, correo, mensaje } = req.body;
    const errores = [];

    if(nombre.trim() === '') {
        errores.push({mensaje : 'El nombre esta vacio.'})
    }
    if(correo.trim() === '') {
        errores.push({mensaje : 'El correo esta vacio.'})
    }
    if(mensaje.trim() === '') {
        errores.push({mensaje : 'El mensaje esta vacio.'})
    }

    if(errores.length > 0) {
        // mostrar errores
        const testimoniales = await Testimoniales.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    } else {
        // almacenar en la db
        try {
            await Testimoniales.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales')
        } catch (error) {
            console.log(error)
        }
    }
}

export { 
    guardarTestimonial
}