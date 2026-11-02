import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const port = Number(process.env.PORT || 5500);
const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
]);

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end('Method not allowed');
    return;
  }

  let pathname;

  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    response.writeHead(400);
    response.end('Bad request');
    return;
  }

  const requestedPath = resolve(root, `.${pathname}`);
  const relativePath = relative(root, requestedPath);

  if (relativePath === '..' || relativePath.startsWith(`..${sep}`) || isAbsolute(relativePath)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  const candidates =
    pathname === '/' || pathname.endsWith('/')
      ? [resolve(requestedPath, 'index.html')]
      : extname(requestedPath)
        ? [requestedPath]
        : [requestedPath, `${requestedPath}.html`, resolve(requestedPath, 'index.html')];

  let filePath;
  let fileStats;

  for (const candidate of candidates) {
    try {
      const candidateStats = await stat(candidate);
      if (candidateStats.isFile()) {
        filePath = candidate;
        fileStats = candidateStats;
        break;
      }
    } catch (error) {
      if (error.code !== 'ENOENT' && error.code !== 'ENOTDIR') {
        console.error(`Unable to inspect ${candidate}:`, error);
        response.writeHead(500);
        response.end('Internal server error');
        return;
      }
    }
  }

  if (!filePath) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }

  response.writeHead(200, {
    'Content-Length': fileStats.size,
    'Content-Type': mimeTypes.get(extname(filePath)) || 'application/octet-stream',
    'X-Content-Type-Options': 'nosniff',
  });

  if (request.method === 'HEAD') {
    response.end();
    return;
  }

  const stream = createReadStream(filePath);
  stream.on('error', (error) => {
    console.error(`Unable to read ${filePath}:`, error);
    if (response.headersSent) {
      response.destroy(error);
      return;
    }
    response.writeHead(500);
    response.end('Internal server error');
  });
  stream.pipe(response);
});

server.listen(port, '127.0.0.1', () => {
  console.info(`Rodow site available at http://localhost:${port}`);
});
