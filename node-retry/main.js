const retry = require('retry');
const http = require('http');

const get = (url, port, cb) => {
  const options = {
    hostname: url,
    port,
    method: 'GET',
  };
  console.log('start request', );
  const req = http.get(options, (res) => {
    res.on('data', (chunk) => {
      console.log(chunk);
    });
  });

  req.on('error', (e) => {
    console.log('===ERROR=== ', e.message);
    cb(e.message)
  });
}

const withRetry = (url, port, cb) => {
  const op = retry.operation();

  op.attempt((currentAttempt) => {
    console.log('Connect time ' + currentAttempt + ':' + url);
    get(url, port, (err) => {
      if (op.retry(err)) return;
      cb(err ? operation.mainError() : null)
    })
  })
}

const bd = '127.0.0.1';
withRetry(bd, 5000, () => {});
// get(bd, 5000, (e) => {
//   console.log(e)
// })