const http = require("http");

const {
  addRoute,
  handleRequest
} = require('./router')

function myExpress() {
  const app = {};
  const middlewares = [];

  app.get = (path, handler) => {
    addRoute(path, "GET", handler);
  };

  app.post = (path, handler) => {
    addRoute(path,  "POST", handler);
  };

  app.put = (path, handler) => {
    addRoute(path,  "PUT", handler);
  };
  

  app.delete = (path, handler) => {
    addRoute(path,  "DELETE", handler);
  };

  app.use = (middleware) => {
    middlewares.push(middleware);
  };

  app.listen = (port, callback) => {
    const server = http.createServer((req, res) => {

      let i = 0;
      function next(){
        const middleware = middlewares[i++];

        if(middleware){
          middleware(req, res, next);
          return;
        }

        if(!handleRequest(req, res)){
          res.statusCode = 404;
        res.end("NOT FOUND");
        }
      }

      next();
    });

    server.listen(port, callback);
  };

  return app;
}

module.exports = myExpress;