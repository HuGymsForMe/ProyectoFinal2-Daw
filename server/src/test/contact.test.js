import request from 'supertest';
import app from '../app';

const ObjectID = "659f16bec6482299f5ae708b";
const ObjectIDError = "noexisto";

describe("Mostrar todas las preguntas de contacto", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).get("/api/contact").send();
    expect(response.statusCode).toBe(200);
  });
});

describe("Mostrar una pregunta de contacto concreta", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).get(`/api/contact/${ObjectID}`).send();
    expect(response.statusCode).toBe(200);
  });
  test("Deberá devolver un STATUS 404", async () => {
    const response = await request(app).get(`/api/contact/${ObjectIDError}`).send();
    expect(response.statusCode).toBe(404);
  });
});

describe("Eliminar una pregunta de contacto", () => {
  test("Debería devolver un STATUS 204", async () => {
    const response = await request(app).delete(`/api/contact/${ObjectID}`).send();
    expect(response.statusCode).toBe(204);
  });
  test("Deberá devolver un STATUS 404", async () => {
    const response = await request(app).delete(`/api/contact/${ObjectIDError}`).send();
    expect(response.statusCode).toBe(404);
  });
});

describe("Actualizar una pregunta de contacto", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).put(`/api/contact/${ObjectID}`).send(
      {
        name: "Updated Name",
        email: "updatedemail@example.com",
        message: "Updated message content"
      }
    );
    expect(response.statusCode).toBe(200);
  });
  test("Debería devolver un STATUS 500", async () => {
    const response = await request(app).put(`/api/contact/${ObjectIDError}`).send(
      {
        name: "Updated Name",
        email: "updatedemail@example.com",
        message: "Updated message content"
      }
    );
    expect(response.statusCode).toBe(500);
  });
});

describe("Añadir una pregunta de contacto", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).post("/api/contact").send(
      {
        name: "New Name",
        email: "newemail@example.com",
        message: "New message content"
      }
    );
    expect(response.statusCode).toBe(200);
  });
  test("Debería devolver un STATUS 500", async () => {
    const response = await request(app).post("/api/contact").send(
      {
        name: "New Name",
        email: "newemail@example.com"
        // Falta el campo 'message' para provocar un error
      }
    );
    expect(response.statusCode).toBe(500);
  });
});
