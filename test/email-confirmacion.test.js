import { expect } from 'chai'
import Mailer from '../service/email.js'
import generador from './generador/usuario.js'
import generadorReserva from './generador/reserva.js'


describe('*** TEST UNITARIO - CONFIRMACION POR MAIL ***', () => {

    let emailsEnviados = []
    const _mentor = generador.getMentor()
    const _student = generador.getStudent()

    const mentorFalso  = { nombre: _mentor.nombre, email: _mentor.email }
    const studentFalso = { nombre: _student.nombre, email: _student.email}
    const reservaFalsa = generadorReserva()


    beforeEach(() => {
        emailsEnviados = []
        
        // reemplazo el transporter real por uno falso
        Mailer.transporter = {
            sendMail: async (opciones) => {
                emailsEnviados.push(opciones) 
                return { messageId: 'fake-id-123' }
            }
        }
    })

    it('Debería enviar 2 emails al confirmar una reserva', async () => {
        
        await Mailer.enviarConfirmacionReserva(reservaFalsa, mentorFalso, studentFalso)

        expect(emailsEnviados).to.have.length(2)
    })

    it('El primer email debería ir al mentor', async () => {

        await Mailer.enviarConfirmacionReserva(reservaFalsa, mentorFalso, studentFalso)

        expect(emailsEnviados[0].to).to.eql(mentorFalso.email)
    })

    it('El segundo email debería ir al student', async () => {

        await Mailer.enviarConfirmacionReserva(reservaFalsa, mentorFalso, studentFalso)

        expect(emailsEnviados[1].to).to.eql(studentFalso.email)
    })

}) // ← cierre del describe