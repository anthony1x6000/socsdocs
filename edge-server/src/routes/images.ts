import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth'
import { Bindings, Variables } from '../types'

const images = new Hono<{ Bindings: Bindings; Variables: Variables }>()

/**
 * Endpoint for uploading profile pictures to R2.
 */
images.post('/upload-image', authMiddleware, async (c) => {
  const session = c.get('session');
  
  const formData = await c.req.formData();
  const file = formData.get('file');

  if (!file || typeof file === 'string') {
    return c.json({ error: 'No file uploaded' }, 400);
  }

  const fileObject = file as File;

  const key = `profile-pics/${session.user.id}-${Date.now()}-${fileObject.name}`;
  await c.env.socs_r2.put(key, fileObject.stream(), {
    httpMetadata: { contentType: fileObject.type }
  });

  const origin = new URL(c.req.url).origin;
  const url = `${origin}/api/images/${key}`;
  return c.json({ url });
})

/**
 * Endpoint to serve images from R2.
 */
images.get('/images/*', async (c) => {
  const key = c.req.path.replace('/api/images/', '');
  const object = await c.env.socs_r2.get(key);

  if (!object) {
    return c.text('Not Found', 404);
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);

  return new Response(object.body, { headers });
})

export default images;
