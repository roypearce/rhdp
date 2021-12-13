import http from 'http';
import nodeStatic from 'node-static';

const file = new nodeStatic.Server('./storybook-static');

http
  .createServer(function (req, res) {
    file.serve(req, res);
  })
  .listen(6006);
