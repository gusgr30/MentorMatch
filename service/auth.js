import UsuariosFactory from '../model/DAO/usuarios/usuariosFactory.js'
import bcrypt from 'bcryptjs'
import config from '../config.js'

class ServiceAuth {
    #modelo

    constructor(){
        const modo = config.MODELO_PERSISTENCIA
        this.#modelo = UsuariosFactory.get(modo)
    }

    login = async (emailBody, passBody) =>{
        const usuario = await this.#modelo.obtenerUsuarioPorEmail(emailBody)
        if(!usuario){
            const error = new Error("El email no se encuentra registrado")
            error.status = 404
            throw error
        }
        const {email,password,nombre,rol,fotoUrl,mentorProfile} = usuario
        
        const valido = await bcrypt.compare(passBody, password)

        if(!valido){
            const error =  new Error("Contraseña incorrecta")
            error.status = 401
            throw error
        }

        return {
            email,
            nombre,
            rol,
            fotoUrl,
            mentorProfile
        }
    }
}

export default ServiceAuth