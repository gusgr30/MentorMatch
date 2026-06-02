import multer from "multer";
import path from "path";

// Configuración del almacenamiento en el disco del servidor
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta destino
  },
  filename: (req, file, cb) => {
    // Le asignamos un nombre unico: timestamp actual + extension original del archivo
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

// Filtro de seguridad para aceptar unicamente imagenes
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("El archivo cargado no es una imagen válida."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limite de tamaño opcional: 2MB
});

export default upload;
