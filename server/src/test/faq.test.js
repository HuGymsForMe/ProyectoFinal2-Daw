import request from 'supertest';
import app from '../app';

const ObjectID = "659d917ff0dbb01f7723cf20";
const ObjectIDError = "noexisto";

describe("Mostrar FaQs", () => {
  test("Debería devolver un STATUS 200", async () => {
      const response = await request(app).get("/api/faqs").send();
      expect(response.statusCode).toBe(200);
  });
});

describe("Mostrar un FaQ", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).get(`/api/faqs/${ObjectID}`).send();
    expect(response.statusCode).toBe(200);
  });
  test("Deberá devolver un STATUS 404", async () => {
    const response = await request(app).get(`/api/faqs/${ObjectIDError}`).send();
    expect(response.statusCode).toBe(404);
  });
});

describe("Eliminar un FaQ", () => {
  test("Debería devolver un STATUS 204", async () => {
    const response = await request(app).delete(`/api/faqs/${ObjectID}`).send();
    expect(response.statusCode).toBe(204);
  });
  test("Debería devolver un STATUS 404", async () => {
    const response = await request(app).delete(`/api/faqs/${ObjectIDError}`).send();
    expect(response.statusCode).toBe(404);
  });
});

describe("Actualizar un FaQ", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).put(`/api/faqs/${ObjectID}`).send(
      {
        question: 'This is a update FaQ?',
        email: 'Yes, this is a update FaQ',
      }
    );
    expect(response.statusCode).toBe(200);
  });
  test("Debería devolver un STATUS 500", async () => {
    const response = await request(app).put(`/api/faqs/${ObjectIDError}`).send(
      {
        question: 'This is a update FaQ?',
        email: 'Yes, this is a update FaQ',
      }
    );
    expect(response.statusCode).toBe(500);
  });
});

describe("Añadir un contacto", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).post("/api/faqs/").send(
      {
        question: 'This is a new FaQ?',
        email: 'Yes, this is a new FaQ',
      }
    );
    expect(response.statusCode).toBe(200);
  });
  test("Debería devolver un STATUS 500", async () => {
    const response = await request(app).post("/api/faqs/").send(
      {
        question: 'This is a new FaQ?',
      }
    );
    expect(response.statusCode).toBe(500);
  });
});

