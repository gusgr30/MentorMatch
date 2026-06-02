import Joi from "joi";
import { ROLES } from "./constants/index.js";

class Usuario {
  constructor({ email, password, nombre, rol, mentorProfile, fotoUrl = null }) {
    this.email = email;
    this.password = password;
    this.nombre = nombre;
    this.rol = rol;
    this.fotoUrl = fotoUrl;
    this.mentorProfile = mentorProfile;
  }

  validar() {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      nombre: Joi.string().min(3).required(),
      rol: Joi.string()
        .valid(...Object.values(ROLES))
        .required(),
      fotoUrl: Joi.string().allow(null, ""),

      //si el rol es mentor
      mentorProfile: Joi.object({
        titulo: Joi.string().min(3).required(),
        descripcion: Joi.string().min(10).required(),
        experiencia: Joi.number().positive().required(),
        tarifa: Joi.number().positive().required(),
        skills: Joi.array().items(Joi.string()).required(),
        linkedin: Joi.string().uri().required(),
        //["lunes "]
        disponibilidad: Joi.array()
          .items(Joi.string())
          .min(1)
          .required()
          .messages({
            "array.min":
              "El mentor debe registrar al menos un horario disponible.",
          }),
      }).when("rol", {
        is: ROLES.STUDENT,
        then: Joi.forbidden(), // Si es alumno, prohibe mandar este objeto
        otherwise: Joi.required(), // Si es mentor, obliga a que manden este objeto
      }),
    });

    const { error } = schema.validate({
      email: this.email,
      password: this.password,
      nombre: this.nombre,
      rol: this.rol,
      fotoUrl: this.fotoUrl,
      mentorProfile: this.mentorProfile,
    });

    if (error) {
      throw new Error(`Validación de Usuario fallida: ${error.message}`);
    }
  }

  get() {
    return {
      email: this.email,
      password: this.password,
      nombre: this.nombre,
      rol: this.rol,
      fotoUrl: this.fotoUrl,
      mentorProfile: this.mentorProfile,
    };
  }
}

export default Usuario;
