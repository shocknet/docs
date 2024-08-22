const express = require('express');
const { exec } = require('child_process');
const crypto = require('crypto');

const app = express();
const port = 3001;

const webhookSecret = process.env.WEBHOOK_SECRET;

app.use(express.json());

function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      resolve(stdout);
    });
  });
}

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

app.get('/webhook', (req, res) => {
  res.status(200).send('Webhook endpoint is active');
});

app.post('/webhook', async (req, res) => {
  const signature = req.headers['x-hub-signature-256'];
  const payload = JSON.stringify(req.body);
  
  const hmac = crypto.createHmac('sha256', webhookSecret);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  
  if (signature !== digest) {
    return res.status(401).send('Invalid signature');
  }

  if (req.body.ref === 'refs/heads/main') { 
    try {
      console.log('Docs pulling latest changes...');
      const pullResult = await runCommand('git pull');
      console.log('Git pull result:', pullResult);
      
      console.log('Restarting docs service...');
      const restartResult = await runCommand('sudo systemctl restart docs.service');
      console.log('Service restart result:', restartResult);
      
      res.status(200).send('Push processed successfully');
    } catch (error) {
      console.error('Error with docs puller:', error);
      res.status(500).send(`Error with docs puller: ${error.message}`);
    }
  } else {
    console.log(`Ignoring push to branch: ${req.body.ref}`);
    res.status(200).send(`Ignoring push to branch: ${req.body.ref}`);
  }
});

app.use((req, res) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  res.status(404).send('Not found');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Docs Puller listening on port ${port}`);
});
