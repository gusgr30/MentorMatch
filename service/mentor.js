import Mentor from '../model/Mentor.js'

import config from '../config.js'
import ModeloFactory from '../model/DAO/mentorFactory.js'

class Service{
    #modelo
    constructor(){
        const modo = config.MODELO_PERSISTENCIA
        this.#modelo = ModeloFactory.get(modo)
    }

    obtenerMentor = async id => {
        if(id){
            const mentor = await this.#modelo.obtenerMentor(id)
            return mentor
        }else{
            const mentores = await this.#modelo.obtenerMentores()
            return mentores
        }
    }

    registrarMentor = async mentor => {
        const nuevoMentor = new Mentor(mentor).get()
        const mentorGuardado = await this.#modelo.registrarMentor(nuevoMentor)
        return mentorGuardado            
    }

    actualizarMentor = async (id, mentor) => {
        const mentorActualizado = await this.#modelo.actualizarMentor(id, mentor)
        return mentorActualizado   
    }
    borrarMentor = async id => {
        const mentorBorrado = await this.#modelo.borrarMentor(id)
        return mentorBorrado
    }
}
export default Service