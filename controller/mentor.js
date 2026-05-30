import Service from '../service/mentor.js'

class Controlador{
    #servicio

    constructor(){
        this.#servicio = new Service
    }

    obtenerMentor = async (req, res) => {
        const {id} = req.params
        const mentores = await this.#servicio.obtenerMentor(id)
        res.json(mentores)
    }

    registrarMentor = async (req, res) => {
        const mentor = req.body
        const  mentorRegistrado = await this.#servicio.registrarMentor(mentor)

        res.json(mentorRegistrado)
    }

    actualizarMentor = async (req, res) => {
        const {id} = req.params
        const mentor = req.body

        const mentorActualizado = await this.#servicio.actualizarMentor(id, mentor)
        
        res.json(mentorActualizado)
    }

    borrarMentor = async (req, res) => {
        const {id} = req.params
        const mentorBorrado = await this.#servicio.borrarMentor(id)

        res.json(mentorBorrado)
    }
}

export default Controlador