import { faker } from "@faker-js/faker/locale/es";

const getReserva = () => ({
  fechaHora: faker.date.future(),
  urlZoom: faker.internet.url()
});

export default getReserva;