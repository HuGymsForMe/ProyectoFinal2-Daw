import request from 'supertest';
import app from '../app';

const ObjectID = "660e60e7a02131d7d2420211";
const ObjectIDError = "noexisto";

describe("Mostrar contactos", () => {
  test("Debería devolver un STATUS 200", async () => {
      const response = await request(app).get("/api/contact").send();
      expect(response.statusCode).toBe(200);
    });
  });

describe("Visualizar un contacto", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).get(`/api/contact/${ObjectID}`).send();
    expect(response.statusCode).toBe(200);
  })
  test("Deberá devolver un STATUS 404", async () => {
    const response = await request(app).get(`/api/contact/${ObjectIDError}`).send();
    expect(response.statusCode).toBe(404);
  })
})

describe("Eliminar un contacto", () => {
  test("Debería devolver un STATUS 204", async () => {
    const response = await request(app).delete(`/api/contact/${ObjectID}`).send();
    expect(response.statusCode).toBe(204);
  })
  test("Debería devolver un STATUS 404", async () => {
    const response = await request(app).delete(`/api/contact/${ObjectIDError}`).send();
    expect(response.statusCode).toBe(404);
  })
})

describe("Actualizar un contacto", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).put(`/api/contact/${ObjectID}`).send(
      {
        name: 'Updated Contact',
        email: 'updatedcontact@example.com',
        message: 'Updated message'
      }
    );
    expect(response.statusCode).toBe(200);
  })
  test("Debería devolver un STATUS 500", async () => {
    const response = await request(app).put(`/api/contact/${ObjectIDError}`).send(
      {
        name: 'Updated Contact',
        email: 'updatedcontact@example.com',
        message: 'Updated message'
      }
    );
    expect(response.statusCode).toBe(500);
  })
})

describe("Añadir un contacto", () => {
  test("Debería devolver un STATUS 200", async () => {
    const response = await request(app).post("/api/contact/").send(
      {
        name: 'New Contact',
        email: 'newcontact@example.com',
        message: 'New message'
      }
    );
    expect(response.statusCode).toBe(200);
  })
  test("Debería devolver un STATUS 500", async () => {
    const response = await request(app).post("/api/contact/").send(
      {
        name: 'New Contact',
        email: 'newcontact@example.com',
      }
    );
    expect(response.statusCode).toBe(500);
  })
})