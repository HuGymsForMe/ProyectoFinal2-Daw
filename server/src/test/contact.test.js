import request from 'supertest';
import app from '../app';

describe("GET /contact", () => {
  test("Debería devolver un STATUS 200", async () => {
      const response = await request(app).get("/api/contact").send();
      expect(response).toBe(200);
  });
});