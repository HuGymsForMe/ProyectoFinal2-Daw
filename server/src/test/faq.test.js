import request from 'supertest';
import app from '../app';

const ObjectID = "659f16bec6482299f5ae708b";
const ObjectIDError = "noexisto";

describe("Mostrar todas las FAQs", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).get("/api/faq").send();
    expect(response.statusCode).toBe(200);
  });
});

describe("Mostrar una FAQ concreta", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).get(`/api/faq/${ObjectID}`).send();
    expect(response.statusCode).toBe(200);
  });
  test("Deberá devolver un STATUS 404", async () => {
    const response = await request(app).get(`/api/faq/${ObjectIDError}`).send();
    expect(response.statusCode).toBe(404);
  });
});

describe("Eliminar una FAQ", () => {
  test("Debería devolver un STATUS 204", async () => {
    const response = await request(app).delete(`/api/faq/${ObjectID}`).send();
    expect(response.statusCode).toBe(204);
  });
  test("Deberá devolver un STATUS 404", async () => {
    const response = await request(app).delete(`/api/faq/${ObjectIDError}`).send();
    expect(response.statusCode).toBe(404);
  });
});

describe("Actualizar una FAQ", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).put(`/api/faq/${ObjectID}`).send(
      {
        question: "Updated question",
        answer: "Updated answer"
      }
    );
    expect(response.statusCode).toBe(200);
  });
  test("Debería devolver un STATUS 500", async () => {
    const response = await request(app).put(`/api/faq/${ObjectIDError}`).send(
      {
        question: "Updated question",
        answer: "Updated answer"
      }
    );
    expect(response.statusCode).toBe(500);
  });
});

describe("Añadir una FAQ", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).post("/api/faq").send(
      {
        question: "New question",
        answer: "New answer"
      }
    );
    expect(response.statusCode).toBe(200);
  });
  test("Debería devolver un STATUS 500", async () => {
    const response = await request(app).post("/api/faq").send(
      {
        question: "New question"
        // Falta el campo 'answer' para provocar un error
      }
    );
    expect(response.statusCode).toBe(500);
  });
});
