import request from 'supertest';
import app from '../app';

const ObjectID = "65a961dd7c56075bcb925585";
const ObjectIDError = "noexisto";

describe("Mostrar partidas", () => {
  test("Debería devolver un STATUS 200", async () => {
      const response = await request(app).get("/api/game").send();
      expect(response.statusCode).toBe(200);
    });
  });

describe("Mostrar una partida", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).get(`/api/game/${ObjectID}`).send();
    expect(response.statusCode).toBe(200);
  });
  test("Deberá devolver un STATUS 404", async () => {
    const response = await request(app).get(`/api/game/${ObjectIDError}`).send();
    expect(response.statusCode).toBe(404);
  });
});

describe("Eliminar una partida", () => {
  test("Debería devolver un STATUS 204", async () => {
    const response = await request(app).delete(`/api/game/${ObjectID}`).send();
    expect(response.statusCode).toBe(204);
  });
  test("Deberá devolver un STATUS 404", async () => {
    const response = await request(app).delete(`/api/game/${ObjectIDError}`).send();
    expect(response.statusCode).toBe(404);
  });
});

describe("Actualizar una partida", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).put(`/api/game/${ObjectID}`).send(
      {
        time: 190,
        misses: 6,
        successes: 24,
        pass: false,
        user: "659489ccbbfaf0ca5b0254c3",
        test: "659e5be344fa4228946c0b97",
      }
    );
    expect(response.statusCode).toBe(200);
  });
  test("Debería devolver un STATUS 500", async () => {
    const response = await request(app).put(`/api/game/${ObjectIDError}`).send(
      {
        time: 190,
        misses: 6,
        successes: 24,
        pass: false,
        user: "659489ccbbfaf0ca5b0254c3",
        test: "659e5be344fa4228946c0b97",
      }
    );
    expect(response.statusCode).toBe(500);
  });
});

describe("Añadir una partida", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).post("/api/game/").send(
      {
        time: 190,
        misses: 6,
        successes: 24,
        pass: false,
        user: "659489ccbbfaf0ca5b0254c3",
        test: "659e5be344fa4228946c0b97",
      }
    );
    expect(response.statusCode).toBe(200);
  });
  test("Debería devolver un STATUS 500", async () => {
    const response = await request(app).post("/api/game/").send(
      {
        time: 190,
        misses: 6,
        successes: 24,
        pass: false,
        user: "659489ccbbfaf0ca5b0254c3",
      }
    );
    expect(response.statusCode).toBe(500);
  });
});


