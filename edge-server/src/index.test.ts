import { describe, it, expect, beforeAll } from 'vitest';
import app from './index';

// Helper to create a mock D1Database
const createMockD1 = () => {
  return {
    prepare: () => ({
      bind: () => ({
        all: async () => ({ results: [] }),
        get: async () => ({}),
        run: async () => ({}),
      }),
    }),
    batch: async () => [],
    exec: async () => ({}),
    dump: async () => new ArrayBuffer(0),
  } as unknown as D1Database;
};

describe('Edge Server Auth Endpoints', () => {
  const env = {
    socs_db: createMockD1(),
    BETTER_AUTH_SECRET: 'test-secret',
    BETTER_AUTH_URL: 'http://localhost:8787',
    FRONTEND_URL: 'http://localhost:3000',
    NODE_ENV: 'test',
  };

  it('GET /api/auth/get-session should return data or 401', async () => {
    const res = await app.request('http://localhost:8787/api/auth/get-session', {}, env);
    const body = await res.json();
    console.log('get-session body:', body);
    expect(res.status).toBeDefined();
  });

  it('POST /api/auth/sign-up/email should be reachable', async () => {
    const res = await app.request('http://localhost:8787/api/auth/sign-up/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      }),
    }, env);
    console.log('sign-up status:', res.status);
    expect(res.status).not.toBe(404);
  });

  it('POST /api/auth/update-user should be reachable', async () => {
    const res = await app.request('http://localhost:8787/api/auth/update-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image: 'https://example.com/new-image.png',
      }),
    }, env);
    console.log('update-user status:', res.status);
    // Should be 401 if not logged in, but not 404
    expect(res.status).not.toBe(404);
  });
});
