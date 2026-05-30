import express from 'express'
import Controlador from '../controller/mentor.js'

class Router {
    #controlador

    constructor(){
        this.#controlador = new Controlador 
    }

    config(){
        const router = express.Router()

        router.get('{/:id}', this.#controlador.obtenerMentor)
        router.post('/', this.#controlador.registrarMentor)
        router.put('/:id', this.#controlador.actualizarMentor)
        router.delete('/:id', this.#controlador.borrarMentor)
        
        return router
    }
}

export default Router