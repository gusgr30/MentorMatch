import jwt from "jsonwebtoken";
import config from "../config.js";

const verificarToken = (req, res, next) => {

  // Obtiene el header Authorization
  const authHeader = req.headers["authorization"];

  // Extrae unicamente el token (quita la palabra "Bearer")
  const token = authHeader && authHeader.split(" ")[1];

  // Si no se envio token, devuelve error de autenticacion
  if (!token) return res.status(401).json({ error: "Token requerido" });

  try {
    // Verifica que el token sea válido usando la clave secreta
    // Si es correcto, guarda la información del usuario en req.usuario
    req.usuario = jwt.verify(token, config.JWT_SECRET);

    // Continua con el siguiente middleware o controlador
    next();
  } catch {
    // Si el token es invalido o expiro, deniega el acceso
    res.status(403).json({ error: "Token inválido o expirado" });
  }
};

export default verificarToken;