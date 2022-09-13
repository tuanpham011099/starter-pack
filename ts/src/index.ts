import express, { Application } from 'express';

import https from 'https';

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function request(url: string, options: https.RequestOptions, data?: object) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let chunks: any[] = [];

      res.on('data', (chunk) => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        const receive = JSON.parse(Buffer.concat(chunks).toString());
        resolve(receive);
      });
    });

    if (data) {
      const payload = JSON.stringify(data);
      req.write(payload);
    }

    req.on('error', (err) => reject(err));
    req.end();
  });
}

app.get('/', (req, res) => { });

app.listen(5000, () => {
  console.log(`App is running on port: ${5000}`);
});
