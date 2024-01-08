const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/getpdf') {
    const filePath = path.join(__dirname, 'files/one.pdf');

    const stat = fs.statSync(filePath);

    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Length': stat.size,
      'Access-Control-Allow-Origin': '*', // Add this line for CORS support
      'Access-Control-Allow-Methods': 'GET', // Adjust based on your needs
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } else {
    res.writeHead(404);
    res.end();
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
