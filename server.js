const { createServer } = require('https');
const next = require('next');
const { parse } = require('url');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const options = {
  key: fs.readFileSync('ssl.key'),
  cert: fs.readFileSync('ssl.cert')
};

app.prepare().then(() => {
  createServer(options, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`ready - started server on url: https://${hostname}:${port}`);
  });
});
