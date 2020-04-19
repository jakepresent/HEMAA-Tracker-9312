const http = require('http');

const PORT = process.env.PORT || 'SOME PORT YOU DEFINE';

const server = http.createServer((req, res) => {
    res.append('Content-Type', 'text/plain');
    res.end('Hello world!');
});

server.listen(PORT);