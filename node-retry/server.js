const http = require('http');
const port = 5000;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello World');
}).listen(port);

console.log('server listening on port ', port);
