const http = require('http');
const url = require('url');
const query = require('querystring');
const responseHandler = require('./responses.js');
const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  switch (request.method) {
    case 'GET':
      if (parsedUrl.pathname === '/') {
        htmlHandler.getIndex(request, response);
      } else if (parsedUrl.pathname === '/style.css') {
        htmlHandler.getCSS(request, response);
      } else if (parsedUrl.pathname === '/getCharacters') {
        responseHandler.getCharacters(request, response);
      } else if (parsedUrl.pathname === '/notReal') {
        responseHandler.notFound(request, response);
      } else {
        responseHandler.notFound(request, response);
      }
      break;
    case 'HEAD':
      if (parsedUrl.pathname === '/getCharacters') {
        responseHandler.getCharactersMeta(request, response);
      } else if (parsedUrl.pathname === '/notReal') {
        responseHandler.notFoundMeta(request, response);
      } else {
        responseHandler.notFoundMeta(request, response);
      }
      break;
    case 'POST':
      if (parsedUrl.pathname === '/addCharacter') {
        const res = response;
        const body = [];

        request.on('error', (err) => {
          console.dir(err);
          res.statusCode = 400;
          res.end();
        });

        request.on('data', (chunk) => {
          body.push(chunk);
        });

        request.on('end', () => {
          const bodyString = Buffer.concat(body).toString();
          const bodyParams = query.parse(bodyString);
          //console.dir(bodyParams);
          responseHandler.addCharacter(request, res, bodyParams);
        });
      } else {
        responseHandler.notFound(request, response);
      }
      break;
    default:
      responseHandler.notFound(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1:${port}`);
