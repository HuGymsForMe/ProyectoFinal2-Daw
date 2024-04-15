import request from 'supertest';
import app from '../app';

const ObjectID = "659489ccbbfaf0ca5b0254c3"; //TODO: Cuando haya candidaturas, poner un ObjectID Existente.
const ObjectIDError = "noexisto";

describe("Mostrar candidaturas", () => {
  test("Debería devolver un STATUS 200", async () => {
      const response = await request(app).get("/api/work").send();
      expect(response.statusCode).toBe(200);
    });
  });

describe("Mostrar una candidatura", () => {
    test("Debería devolver un STATUS 200", async () => {
        const response = await request(app).get(`/api/work/${ObjectID}`).send();
        expect(response.statusCode).toBe(200);
    });
    test("Deberá devolver un STATUS 404", async () => {
        const response = await request(app).get(`/api/work/${ObjectIDError}`).send();
        expect(response.statusCode).toBe(404);
    });
});

describe("Eliminar una candidatura", () => {
    test("Debería devolver un STATUS 204", async () => {
      const response = await request(app).delete(`/api/work/${ObjectID}`).send();
      expect(response.statusCode).toBe(204);
    });
    test("Deberá devolver un STATUS 404", async () => {
      const response = await request(app).delete(`/api/work/${ObjectIDError}`).send();
      expect(response.statusCode).toBe(404);
    });
  });

//TODO: Continua cuando este el formulario de trabaja con nosotros acabado.
// describe("Actualizar una candidatura", () => {
//     test("Debería devolver un STATUS 200", async () => {
//         const response = await request(app).put(`/api/work/${ObjectID}`).send();
//         expect(response.statusCode).toBe(200);
//     });
//     test("Debería devolver un STATUS 500", async () => {
//         const response = await request(app).put(`/api/work/${ObjectIDError}`).send();
//         expect(response.statusCode).toBe(500);
//     });
// });

// describe("Añadir una candidatura", () => {
//     test("Debería devolver un STATUS 200", async () => {
//       const response = await request(app).post("/api/register/").send();
//       expect(response.statusCode).toBe(200);
//     });
//     test("Debería devolver un STATUS 500", async () => {
//       const response = await request(app).post("/api/register/").send();
//       expect(response.statusCode).toBe(500);
//     });
//   });
  