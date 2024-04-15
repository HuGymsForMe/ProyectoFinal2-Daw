import request from 'supertest';
import app from '../app';

const ObjectID = "659f16bec6482299f5ae708b";
const ObjectIDError = "noexisto";

describe("Mostrar las preguntas de los test", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).get("/api/test").send();
    expect(response.statusCode).toBe(200);
  });
});

describe("Mostrar una pregunta concreta", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).get(`/api/testAdmin/${ObjectID}`).send();
    expect(response.statusCode).toBe(200);
  });
  test("Deberá devolver un STATUS 404", async () => {
    const response = await request(app).get(`/api/testAdmin/${ObjectIDError}`).send();
    expect(response.statusCode).toBe(404);
  });
});

describe("Eliminar una pregunta de un test", () => {
  test("Debería devolver un STATUS 204", async () => {
    const response = await request(app).delete(`/api/test/${ObjectID}`).send();
    expect(response.statusCode).toBe(204);
  });
  test("Deberá devolver un STATUS 404", async () => {
    const response = await request(app).delete(`/api/test/${ObjectIDError}`).send();
    expect(response.statusCode).toBe(404);
  });
});

describe("Actualizar una pregunta de un test", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).put(`/api/test/${ObjectID}`).send(
      {
        image: "imagen4.webp",
        question: "Este ciclista...",
        first_answer: "debería circular lo más cerca posible del eje central de la calzada.",
        second_answer: "circula correctamente.",
        third_answer: "no puede circular si la calzada no dispone de arcén.",
        correct_answer: "circula correctamente.",
        test: "659e56222d2690f6d6cdd561"
      }
    );
    expect(response.statusCode).toBe(200);
  });
  test("Debería devolver un STATUS 500", async () => {
    const response = await request(app).put(`/api/test/${ObjectIDError}`).send(
      {
        image: "imagen4.webp",
        question: "Este ciclista...",
        first_answer: "debería circular lo más cerca posible del eje central de la calzada.",
        second_answer: "circula correctamente.",
        third_answer: "no puede circular si la calzada no dispone de arcén.",
        correct_answer: "circula correctamente.",
        test: "659e56222d2690f6d6cdd561"
      }
    );
    expect(response.statusCode).toBe(500);
  });
});

describe("Añadir una partida", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).post("/api/test/").send(
      {
        image: "imagen4.webp",
        question: "Este ciclista...",
        first_answer: "debería circular lo más cerca posible del eje central de la calzada.",
        second_answer: "circula correctamente.",
        third_answer: "no puede circular si la calzada no dispone de arcén.",
        correct_answer: "circula correctamente.",
        test: "659e56222d2690f6d6cdd561"
      }
    );
    expect(response.statusCode).toBe(200);
  });
  test("Debería devolver un STATUS 500", async () => {
    const response = await request(app).post("/api/test/").send(
      {
        image: "imagen4.webp",
        question: "Este ciclista...",
        first_answer: "debería circular lo más cerca posible del eje central de la calzada.",
        second_answer: "circula correctamente.",
        third_answer: "no puede circular si la calzada no dispone de arcén.",
        correct_answer: "circula correctamente."
      }
    );
    expect(response.statusCode).toBe(500);
  });
});