import { faker } from "@faker-js/faker/locale/es";

const getStudent = () => ({
  email: faker.internet.email(),
  password: faker.internet.password({ length: 6 }),
  nombre: faker.person.fullName(),
  rol: "student",
  fotoUrl: faker.image.avatar(),
});

const getMentor = () => ({
  email: faker.internet.email(),
  password: faker.internet.password({ length: 6 }),
  nombre: faker.person.fullName(),
  rol: "mentor",
  fotoUrl: faker.image.avatar(),
  mentorProfile: {
    titulo: faker.person.jobTitle(),
    descripcion: faker.lorem.paragraph(),
    experiencia: faker.number.int({ min: 1, max: 20 }),
    tarifa: faker.number.int({ min: 1000, max: 10000 }),
    skills: [faker.person.jobArea(), faker.person.jobArea()],
    linkedin: faker.internet.url(),
    disponibilidad: ["lunes 14:00", "martes 16:00"],
  },
});
export default {
  getStudent,
  getMentor,
};
