// https://nodemailer.com/     ****Biblioteca para envio de mails para Node.js****
// https://ethereal.email/     ****Servicio SMTP falso****

import nodemailer from 'nodemailer'
import { ROLES } from '../model/constants/index.js'

class Mailer{
    static transporter = null

    static async config(){
        try{
            //Se crea la cuenta SMTP para ethereal.email
            const cuentaTest = await nodemailer.createTestAccount()

            //Se crea un transportador SMTP. Gestiona la conexión con el servicio de mail y envia mensajes.
            //Se crea un transportador y se reutiliza en todos los mails
            Mailer.transporter = nodemailer.createTransport({
                host: cuentaTest.smtp.host,
                port: cuentaTest.smtp.port,
                secure: cuentaTest.smtp.secure,
                auth: {
                    user: cuentaTest.user,
                    pass: cuentaTest.pass
                }
            })
            console.log('Cuenta de prueba creada: %s', cuentaTest.user)

        }catch(err){
                console.error('Falló la creación de la cuenta de prueba' + err.message)
                process.exit(1)
        }
    }

    static enviarBienvenida = async ({nombre, email, rol}) =>{
        try{
            let info
            if(rol === ROLES.MENTOR){
                info = await Mailer.transporter.sendMail({
                    from: '"MentorMatch" <no-reply@mentormatch.com>',
                    to: email,
                    subject: '¡Bienvenido a MentorMatch! Tu perfil de mentor ya está activo',
                    html:`<h1>Bienvenido a MentorMatch</h1>/br<p>Hola ${nombre}! Nos emociona darte la bienvenida a la comunidad de MentorMatch; tu perfil ya se encuentra habilitado para que empieces a compartir tu experiencia y ayudes a otros estudiantes a potenciar sus habilidades. A partir de este momento, los alumnos van a poder ver tus tecnologías, consultar tu disponibilidad y agendar videollamadas con vos para resolver dudas o recibir apoyo en sus proyectos. ¡Gracias por sumarte y preparate para tu primera mentoría!</p>`,
                })
            }else if(rol === ROLES.STUDENT){
                info = await Mailer.transporter.sendMail({
                    from: '"MentorMatch" <no-reply@mentormatch.com>',
                    to: email,
                    subject: '¡Bienvenido a MentorMatch! Encontrá al mentor ideal para tu próximo proyecto',
                    html:`<h1>Bienvenido a MentorMatch</h1><p>Hola, ${nombre}! Nos alegra darte la bienvenida a MentorMatch; tu cuenta ya está configurada y lista para que des el siguiente paso en tu carrera. A partir de hoy, vas a poder explorar nuestro catálogo de profesionales, buscar expertos en las tecnologías que necesitás dominar (como Node.js, Vue, React, .NET) y agendar videollamadas personalizadas para destrabar código o resolver dudas puntuales. ¡Muchos éxitos en tu aprendizaje y que disfrutes de tu primera clase!</p>`
                })
            }
            console.log('Mensaje enviado: %s', info.messageId)
            console.log('Preview: ' + nodemailer.getTestMessageUrl(info))
            return info
            
        }catch(err){
            const error = new Error(err.message)
            error.status = 500
            throw error
        }

    }
    // static enviarNotificacionReserva = async (reserva) =>{

    // }
    // static enviarConfirmacionReserva = async (reserva) =>{

    // }
}

export default Mailer
