import request from 'supertest';
import app from '../app'; // Asegúrate de que esta importación sea correcta

describe("Mostar contactos", () => {
  test("Debería devolver un STATUS 200", async () => {
      const response = await request(app).get("/api/contact").send(); // Cambia la ruta según corresponda
      expect(response.statusCode).toBe(200); // Asegúrate de comparar con statusCode
  });
});
