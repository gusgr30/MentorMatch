import express from "express"
import AuthController from "../controller/auth.js"
import verificarToken from "../middleware/auth.js"

class RouterAuth{
    #controlador
    
    constructor(persistencia){
        this.#controlador = new AuthController()
    }

    config(){
        const router = express.Router()

        router.post('/login', this.#controlador.login)
        router.get('/me', verificarToken, this.#controlador.me)

        return router
    }
}

export default RouterAuth