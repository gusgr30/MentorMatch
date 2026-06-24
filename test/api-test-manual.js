import supertest from "supertest";

const testServidorConSupertest = async () => {
  try {
    const url = "http://localhost:8080";
    const request = supertest(url);
    const { body, status } = await request.get('/api/usuarios/6a2b15f64fa1a99c1b1662ff');
    console.log("🚀 ~ testServidorConSupertest ~ status:", status);
    console.log("🚀 ~ testServidorConSupertest ~ body:", body);
  } catch (error) {
    console.log("🚀 ~ testServidorConAxios ~ error:", error);
  }
};

testServidorConSupertest();
