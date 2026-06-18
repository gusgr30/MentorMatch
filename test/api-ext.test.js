import { expect } from "chai";
import supertest from "supertest";
import generador from "./generador/usuario.js";

const request = supertest("http://localhost:8080/api");
let tokenUsuario = null;

describe("**** TEST DEL SERVICIO APIREST FULL(con el servicio levantado) ***", () => {
  describe("POST", () => {
    const userNew = generador.getStudent();
    //aca van todos los it de las peticiones GET
    it("Deberia incorporar un usuario", async () => {
      const response = await request.post("/usuarios").send(userNew);
      // console.log(response);
      expect(response.status).to.eql(200);
      const usuarioGuardado = response.body;
      expect(usuarioGuardado).to.include.keys("acknowledged", "insertedId");
    });

    it("Deberia logear al usuario creado", async () => {
      const response = await request
        .post("/auth/login")
        .send({ email: userNew.email, password: userNew.password });
      expect(response.status).to.eql(200);
      tokenUsuario = response.body.token;
    });
  });

  describe("GET", () => {
    //aca van todos los it de las peticiones GET
    it("Deberia retornar un stuts 200", async () => {
      const response = await request
        .get("/usuarios")
        .set("Authorization", `Bearer ${tokenUsuario}`);
      console.log(response.body);
      expect(response.status).to.eql(200);
    });
  });
});
