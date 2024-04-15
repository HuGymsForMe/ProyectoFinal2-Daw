import request from 'supertest';
import app from '../app';

const ObjectID = "659489ccbbfaf0ca5b0254c3";
const ObjectIDError = "noexisto";

describe("Mostrar usuarios", () => {
  test("Debería devolver un STATUS 200", async () => {
      const response = await request(app).get("/api/users").send();
      expect(response.statusCode).toBe(200);
    });
  });

describe("Mostrar un usuario", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).get(`/api/users/${ObjectID}`).send();
    expect(response.statusCode).toBe(200);
  });
  test("Deberá devolver un STATUS 404", async () => {
    const response = await request(app).get(`/api/users/${ObjectIDError}`).send();
    expect(response.statusCode).toBe(404);
  });
});

describe("Eliminar un usuario", () => {
  test("Debería devolver un STATUS 204", async () => {
    const response = await request(app).delete(`/api/users/${ObjectID}`).send();
    expect(response.statusCode).toBe(204);
  });
  test("Deberá devolver un STATUS 404", async () => {
    const response = await request(app).delete(`/api/users/${ObjectIDError}`).send();
    expect(response.statusCode).toBe(404);
  });
});

describe("Actualizar un usuario", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).put(`/api/users/${ObjectID}`).send({email: "updateuser@gmail.com"});
    expect(response.statusCode).toBe(200);
  });
  test("Debería devolver un STATUS 500", async () => {
    const response = await request(app).put(`/api/users/${ObjectIDError}`).send({email: "updateuser@gmail.com"});
    expect(response.statusCode).toBe(500);
  });
});

describe("Añadir un usuario", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).post("/api/register/").send(
    {
      name: "Pepe",
      surnames: "Pérez Martínez",
      username: "Pepe39Guada",
      email: "pepeguada@gmail.com",
      password: "contraseniadepepe",
      birthday: "1987-03-03",
      premium_user: false,
      admin: false,
    }
  );
    expect(response.statusCode).toBe(200);
  });
  test("Debería devolver un STATUS 500", async () => {
    const response = await request(app).post("/api/register/").send(
      {
        name: "Pepe",
        surnames: "Pérez Martínez",
        username: "Pepe39Guada",
        email: "pepeguada@gmail.com",
        password: "contraseniadepepe",
        birthday: "1987-03-03",
      }
    );
    expect(response.statusCode).toBe(500);
  });
});
