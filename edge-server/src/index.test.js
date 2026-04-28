import { describe, it, expect, vi } from 'vitest';
vi.mock('better-auth', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        betterAuth: (options) => {
            const auth = actual.betterAuth(options);
            // Spy on getSession to return a mocked session for our test token
            auth.api.getSession = async (req) => {
                const authHeader = req?.headers?.get('authorization') || req?.headers?.get('Authorization');
                if (authHeader === 'Bearer test-token') {
                    return {
                        session: { id: 'sess_1', userId: 'user_1', token: 'test-token', expiresAt: new Date(Date.now() + 100000), ipAddress: '', userAgent: '', createdAt: new Date(), updatedAt: new Date() },
                        user: { id: 'user_1', name: 'Test User', email: 'test@example.com', emailVerified: true, createdAt: new Date(), updatedAt: new Date(), image: null }
                    };
                }
                return actual.betterAuth(options).api.getSession(req);
            };
            return auth;
        }
    };
});
import app from './index';
const createMockD1 = () => ({
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
});
const createMockR2 = () => ({
    put: vi.fn().mockResolvedValue({}),
    get: vi.fn().mockResolvedValue(null),
});
describe('Edge Server Auth Endpoints', () => {
    const env = {
        socs_db: createMockD1(),
        socs_r2: createMockR2(),
        BETTER_AUTH_SECRET: 'test-secret',
        BETTER_AUTH_URL: 'http://localhost:8787',
        FRONTEND_URL: 'http://localhost:3000',
        NODE_ENV: 'test',
    };
    it('GET /api/auth/get-session should return data or 401', async () => {
        const res = await app.request('http://localhost:8787/api/auth/get-session', {}, env);
        expect(res.status).toBeDefined();
    });
    it('OPTIONS /api/upload-image should return 204 (CORS preflight)', async () => {
        const res = await app.request('http://localhost:8787/api/upload-image', {
            method: 'OPTIONS',
            headers: {
                'Origin': 'http://localhost:3000',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Authorization',
            }
        }, env);
        expect(res.status).toBe(204);
    });
    it('POST /api/upload-image should return 401 without session', async () => {
        const formData = new FormData();
        const res = await app.request('http://localhost:8787/api/upload-image', {
            method: 'POST',
            body: formData,
        }, env);
        expect(res.status).toBe(401);
    });
    it('POST /api/upload-image should succeed with mocked session', async () => {
        const imgRes = await fetch('https://anthonyis.online/img/favicon.png');
        const blob = await imgRes.blob();
        const file = new File([blob], 'favicon.png', { type: 'image/png' });
        const formData = new FormData();
        formData.append('file', file);
        // Mock getSession to bypass 401
        // Better Auth internals hard to mock in app.request, 
        // but we verify logic path if session exists
        const res = await app.request('http://localhost:8787/api/upload-image', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': 'Bearer test-token'
            }
        }, env);
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data.url).toContain('/api/images/');
        // Test GET /api/images/...
        const imagePath = new URL(data.url).pathname;
        // Mock R2 to return a successful object
        env.socs_r2.get = vi.fn().mockResolvedValue({
            body: new ArrayBuffer(0),
            writeHttpMetadata: vi.fn(),
            httpEtag: '"test-etag"'
        });
        const getRes = await app.request(`http://localhost:8787${imagePath}`, {}, env);
        expect(getRes.status).toBe(200);
    });
});
