// https://nodemailer.com/     ****Biblioteca para envio de mails para Node.js****
// https://ethereal.email/     ****Servicio SMTP falso****

import nodemailer from 'nodemailer'
import { ROLES } from '../model/constants/index.js'

class Mailer{
    static transporter = null

    static async config(){
        try{
            //Se crea un transportador SMTP. Gestiona la conexión con el servicio de mail y envia mensajes.
            //Se crea un transportador y se reutiliza en todos los mails
            Mailer.transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.ETHEREAL_USER,
                    pass: process.env.ETHEREAL_PASS
                }
            })

        }catch(err){
                console.error('Falló la creación del transporter  ' + err.message)
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
                    html:`<h1>Bienvenido a MentorMatch</h1>
                    <br>
                    <p>Hola ${nombre}! Nos emociona darte la bienvenida a la comunidad de MentorMatch; tu perfil ya se encuentra habilitado para que empieces a compartir tu experiencia y ayudes a otros estudiantes a potenciar sus habilidades. A partir de este momento, los alumnos van a poder ver tus tecnologías, consultar tu disponibilidad y agendar videollamadas con vos para resolver dudas o recibir apoyo en sus proyectos. ¡Gracias por sumarte y preparate para tu primera mentoría!</p>`,
                })
            }else if(rol === ROLES.STUDENT){
                info = await Mailer.transporter.sendMail({
                    from: '"MentorMatch" <no-reply@mentormatch.com>',
                    to: email,
                    subject: '¡Bienvenido a MentorMatch! Encontrá al mentor ideal para tu próximo proyecto',
                    html:`<h1>Bienvenido a MentorMatch</h1>
                    <br>
                    <p>Hola, ${nombre}! Nos alegra darte la bienvenida a MentorMatch; tu cuenta ya está configurada y lista para que des el siguiente paso en tu carrera. A partir de hoy, vas a poder explorar nuestro catálogo de profesionales, buscar expertos en las tecnologías que necesitás dominar (como Node.js, Vue, React, .NET) y agendar videollamadas personalizadas para destrabar código o resolver dudas puntuales. ¡Muchos éxitos en tu aprendizaje y que disfrutes de tu primera clase!</p>`
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

    static enviarNotificacionReserva = async (reserva, mentor, student) =>{
        try{
            const info = await Mailer.transporter.sendMail({
                from: '"MentorMatch" <no-reply@mentormatch.com>',
                to: mentor.email,
                subject: '¡Tienes una nueva reserva en MentorMatch!',
                html: `<p>Hola ${mentor.nombre}. Te escribimos para avisarte que ${student.nombre} acaba de reservar una sesión de mentoría con vos. Presiona el siguiente boton para conocer mas detalles y confirmarla lo antes posible.</p>
                <br>
                <a href="localhost:8080/reservas/${reserva._id}"><button>Ver reserva</button></a>`
            })
            console.log('Mensaje enviado: %s', info.messageId)
            console.log('Preview: ' + nodemailer.getTestMessageUrl(info))
            return info
            
        }catch(err){
            console.log("Mail no enviado")
            const error = new Error(err.message)
            error.status = 500
            throw error
        }
    }
    static enviarConfirmacionReserva = async (reserva, mentor, student) =>{
        try{
            const infoMentor = await Mailer.transporter.sendMail({
                from: '"MentorMatch" <no-reply@mentormatch.com>',
                to: mentor.email,
                subject: `¡Mentoria con ${student.nombre} confirmada!`,
                html:`<h1>Mentoria confirmada</h1>
                <br>
                <p>Hola ${mentor.nombre}! Has confirmado la reserva para la mentoria con ${student.nombre}.</p>
                <br>
                <p>La videollamada está agendada para el dia <strong>${reserva.fechaHora.toLocaleString()}</strong> y vas a poder ingresar a la clase directamente a través de este enlace: <a href="${reserva.urlZoom}"><strong>${reserva.urlZoom}</strong></a>. Te recomendamos conectarte unos minutos antes para revisar que todo funcione bien. ¡Que tengas una excelente clase!</p>` ,
            })
            
            const infoStudent = await Mailer.transporter.sendMail({
                from: '"MentorMatch" <no-reply@mentormatch.com>',
                to: student.email,
                subject: `¡Mentoria con ${mentor.nombre} confirmada!`,
                html: `<h1>Mentoria confirmada</h1>
                <br>
                <p>Hola ${student.nombre}! ${mentor.nombre} ha confirmado la reserva de la mentoria.</p>
                <br>
                <p>La videollamada está agendada para el dia <strong>${reserva.fechaHora.toLocaleString()}</strong> y vas a poder ingresar directamente a través de este enlace: <a href="${reserva.urlZoom}"><strong>${reserva.urlZoom}</strong></a>. ¡Que tengas una excelente clase!</p>` 
            })

            console.log('Mensaje enviado: %s', infoMentor.messageId)
            console.log('Preview: ' + nodemailer.getTestMessageUrl(infoMentor))
            console.log('Mensaje enviado: %s', infoStudent.messageId)
            console.log('Preview: ' + nodemailer.getTestMessageUrl(infoStudent))

            return {infoMentor, infoStudent}
            
        }catch(err){
            const error = new Error(err.message)
            error.status = 500
            throw error
        }
    }
}

export default Mailer
