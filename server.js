import express from 'express'
import RouterMentor from './router/mentor.js'

class Server{
    #port
    #routerMentor
    constructor(port){
        this.#port = port
        this.#routerMentor = new RouterMentor().config()
    }

    start(){
        const app = express()
        app.use(express.json())

        app.use(express.static("public/"))

        app.use('/api/mentores', this.#routerMentor)

        const PORT = this.#port
        const server = app.listen(PORT, () => console.log(`Servidor de MentorMatch escuchando en puerto ${PORT}`))
        server.on('error', error => console.log("Error en el servidor " + error))
    }

}

export default Server