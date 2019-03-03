const config = require('./config/config');
const StaticServer = require('static-server');
const server = new StaticServer({
  rootPath: '.',            // required, the root of the server file tree
  port: config.PORT,               // required, the port to listen
  name: 'nl-static-web',   // optional, will set "X-Powered-by" HTTP header
  host: 'localhost',       // optional, defaults to any interface
  cors: '*',                // optional, defaults to undefined
  followSymlink: true,      // optional, defaults to a 404 error
  templates: {
    index: 'index.html',      // optional, defaults to 'index.html'
    notFound: '404.html'    // optioenal, defaults to undefined
  }
});

server.start(() => {
  console.log(server.name, 'started on', server.port);
});

server.on('request', (req, res) => {
  // req.path is the URL resource (file name) from server.rootPath
  // req.elapsedTime returns a string of the request's elapsed time
});

server.on('symbolicLink', (link, file) => {
  // link is the source of the reference
  // file is the link reference
  console.log('File', link, 'is a link to', file);
});

server.on('response', (req, res, err, file, stat) => {
  // res.status is the response status sent to the client
  // res.headers are the headers sent
  // err is any error message thrown
  // file the file being served (may be null)
  // stat the stat of the file being served (is null if file is null)
  // NOTE: the response has already been sent at this point
});