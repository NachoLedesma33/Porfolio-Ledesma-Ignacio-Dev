/**
 * @jest-environment node
 */

const mockSend = jest.fn();

jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: mockSend },
  })),
}));

let POST: typeof import("../../../api/contact/route").POST;

beforeEach(async () => {
  jest.resetModules();
  process.env.RESEND_API_KEY = "test-key";
  process.env.CONTACT_TO_EMAIL = "test@example.com";
  process.env.CONTACT_FROM = "Test <test@example.com>";

  const route = await import("../../../api/contact/route");
  POST = route.POST;
});

afterEach(() => {
  delete process.env.RESEND_API_KEY;
  delete process.env.CONTACT_TO_EMAIL;
  delete process.env.CONTACT_FROM;
});

function makeRequest(body: unknown): Request {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  it("retorna 500 si RESEND_API_KEY no está configurada", async () => {
    delete process.env.RESEND_API_KEY;
    const res = await POST(makeRequest({ name: "Test", email: "a@b.com", message: "Hello world!!" }));
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toMatch(/RESEND_API_KEY missing/);
  });

  it("retorna 400 si el JSON es inválido", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Invalid JSON body");
  });

  it("retorna 400 si name es muy corto", async () => {
    const res = await POST(makeRequest({ name: "A", email: "a@b.com", message: "Hello world!!" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Invalid name");
  });

  it("retorna 400 si name es muy largo", async () => {
    const res = await POST(makeRequest({ name: "X".repeat(81), email: "a@b.com", message: "Hello world!!" }));
    expect(res.status).toBe(400);
  });

  it("retorna 400 si email es inválido", async () => {
    const res = await POST(makeRequest({ name: "Test", email: "not-email", message: "Hello world!!" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Invalid email");
  });

  it("retorna 400 si message es muy corto", async () => {
    const res = await POST(makeRequest({ name: "Test", email: "a@b.com", message: "Hi" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Invalid message");
  });

  it("retorna 400 si message es muy largo", async () => {
    const res = await POST(makeRequest({ name: "Test", email: "a@b.com", message: "X".repeat(2001) }));
    expect(res.status).toBe(400);
  });

  it("retorna 200 si el honeypot website está lleno", async () => {
    const res = await POST(makeRequest({ name: "Test", email: "a@b.com", message: "Hello world!!", website: "spam" }));
    expect(res.status).toBe(200);
  });

  it("retorna 200 y llama a Resend si todo es válido", async () => {
    mockSend.mockResolvedValueOnce({ data: { id: "mock-id" }, error: null });
    const res = await POST(makeRequest({ name: "Test", email: "a@b.com", message: "Hello world!!" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.id).toBe("mock-id");
  });

  it("retorna 502 si Resend devuelve error", async () => {
    mockSend.mockResolvedValueOnce({ data: null, error: { message: "Resend error" } });
    const res = await POST(makeRequest({ name: "Test", email: "a@b.com", message: "Hello world!!" }));
    expect(res.status).toBe(502);
    const body = await res.json();
    expect(body.error).toBe("Resend error");
  });

  it("rate limit: retorna 429 después de 5 requests", async () => {
    mockSend.mockResolvedValue({ data: { id: "mock-id" }, error: null });
    for (let i = 0; i < 5; i++) {
      const res = await POST(makeRequest({ name: "Test", email: "a@b.com", message: "Hello world!!" }));
      expect(res.status).toBe(200);
    }
    const res = await POST(makeRequest({ name: "Test", email: "a@b.com", message: "Hello world!!" }));
    expect(res.status).toBe(429);
    const body = await res.json();
    expect(body.error).toMatch(/Too many requests/);
  });
});
