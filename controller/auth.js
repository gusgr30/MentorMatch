import ServiceAuth from '../service/auth.js'

class ControllerAuth {
    #servicio

    constructor(){
        this.#servicio = new ServiceAuth()
    }

    login = async (req, res) => {
        const {email, password} = req.body
        try{
            const usuarioLogueado = await this.#servicio.login(email, password)
            res.json(usuarioLogueado)

        }catch(err){
            res.status(err.status || 500).json({error: err.message})
        }
    }

    me = async (req, res) => {
        try {
            const usuario = await this.#servicio.obtenerPorId(req.usuario.id)
            res.json({...usuario,_id:req.usuario.id})
        } catch(err) {
            res.status(err.status || 500).json({error: err.message})
        }
    }
}

export default ControllerAuth

