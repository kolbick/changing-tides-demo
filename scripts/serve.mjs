import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root = resolve('dist');
const types = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg','.woff2':'font/woff2','.json':'application/json'};
const server = createServer(async (request,response) => {
  try {
    const path = resolve(root,decodeURIComponent(new URL(request.url,'http://localhost').pathname).replace(/^\//,''));
    if (path !== root && !path.startsWith(root + sep)) throw new Error('Outside public directory');
    const file = (await stat(path)).isDirectory() ? resolve(path,'index.html') : path;
    response.writeHead(200,{'Content-Type':types[extname(file)] || 'application/octet-stream','Cache-Control':'no-store'});
    response.end(await readFile(file));
  } catch {response.writeHead(404); response.end('Not found');}
});
server.listen(8774,'127.0.0.1',() => console.log('Local preview: http://127.0.0.1:8774'));
