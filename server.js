const express = require('express');

const app = express();
const port = process.env.PORT || process.argv[2] || 80;
app.use('/', express.static(`${__dirname}/build`));
app.listen(port, function () {
  console.log('listening on port:', port);
});
