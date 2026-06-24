import { expect } from "chai";
import supertest from "supertest";
import generador from "./generador/usuario.js";
import Server from "../server.js";

describe("**** TEST DEL SERVICIO APIREST FULL(INT) ***", () => {
  let request;
  let server;
  let tokenUsuario = null;
  const userNew = generador.getStudent();

//Mocha ejecuta una sola vez antes de todos los tests del describe
  before(async () => {
    server = new Server(8081, "MONGODB");
    const app = await server.start();
    request = supertest(app);
  });
//Mocha ejecuta una sola vez despues de todos los tests del describe
  after(async () => {
    await server.stop();
  });

  describe("POST", () => {
    it("Deberia incorporar un usuario", async () => {
      const response = await request.post("/api/usuarios").send(userNew);
      expect(response.status).to.eql(200);
      const usuarioGuardado = response.body;
      expect(usuarioGuardado).to.include.keys("acknowledged", "insertedId");
    });

    it("Deberia logear al usuario creado", async () => {
      const response = await request
        .post("/api/auth/login")
        .send({ email: userNew.email, password: userNew.password });
      expect(response.status).to.eql(200);
      tokenUsuario = response.body.token;
    });
  });

  describe("GET", () => {
    it("Deberia retornar un status 200", async () => {
      const response = await request
        .get("/api/usuarios")
        .set("Authorization", `Bearer ${tokenUsuario}`);
      expect(response.status).to.eql(200);
    });
  });
});
