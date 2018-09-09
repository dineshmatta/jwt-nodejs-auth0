const express = require("express");

const app = express();
const PORT = 8888;

app.get('/status', (req, res) => {
  const localTime = (new Date()).toLocaleTimeString();

  res.status(200).send(`server time is ${localTime}`);
});

app.get('*', (req, res) => {
  res.sendStatus(404);
})

app.listen(PORT, () => {
  console.log(`server is runnign on PORt ${PORT}`);
})

