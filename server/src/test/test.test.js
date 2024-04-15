import request from 'supertest';
import app from '../app';

const ObjectID = "659e56222d2690f6d6cdd561";
const ObjectIDError = "noexisto";

describe("Mostrar todos los test", () => {
  test("Debería devolver un STATUS 200", async () => {
      const response = await request(app).get("/api/tests").send();
      expect(response.statusCode).toBe(200);
    });
  });

describe("Mostrar un test", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).get(`/api/tests/${ObjectID}`).send();
    expect(response.statusCode).toBe(200);
  });
  test("Deberá devolver un STATUS 404", async () => {
    const response = await request(app).get(`/api/tests/${ObjectIDError}`).send();
    expect(response.statusCode).toBe(404);
  });
});

describe("Eliminar un test", () => {
  test("Debería devolver un STATUS 204", async () => {
    const response = await request(app).delete(`/api/tests/${ObjectID}`).send();
    expect(response.statusCode).toBe(204);
  });
  test("Deberá devolver un STATUS 404", async () => {
    const response = await request(app).delete(`/api/tests/${ObjectIDError}`).send();
    expect(response.statusCode).toBe(404);
  });
});

describe("Actualizar una test", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).put(`/api/tests/${ObjectID}`).send({number_test: 3});
    expect(response.statusCode).toBe(200);
  });
  test("Debería devolver un STATUS 500", async () => {
    const response = await request(app).put(`/api/tests/${ObjectIDError}`).send({number_test: 3});
    expect(response.statusCode).toBe(500);
  });
});

describe("Añadir un test", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).post("/api/tests/").send({number_test: 20});
    expect(response.statusCode).toBe(200);
  });
  test("Debería devolver un STATUS 500", async () => {
    const response = await request(app).post("/api/tests/").send({number_test: 20});
    expect(response.statusCode).toBe(500);
  });
});