import express from "express"
import AuthController from "../controller/auth.js"

class RouterAuth{
    #controlador
    
    constructor(){
        this.#controlador = new AuthController()
    }

    config(){
        const router = express.Router()

        router.post('/',this.#controlador.login)

        return router
    }
}

export default RouterAuth