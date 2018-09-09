const express = require("express");
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")


const app = express();
const PORT = process.env.PORT || 8888;
//For testsing purpose, DO NOT Store you Credentials in clear text
const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin'
  },
  {
    id: 2,
    username: 'guest',
    password: 'guest'
  }
]

app.use(bodyParser.json());

app.post('/login', (req, res)=> {

  if(!req.body.username || !req.body.password) {
    res
    .status(400)
    .send("You need a username and password");
    return; // stop execution of this callback
  }

  const user = users.find((u) => {
    return u.username === req.body.username && u.password === req.body.password;
  });

  if(!user){
    res
    .status(401)
    .send('User not found');
    return
  }

  const token = jwt.sign({
    sub: user.id,
    username: user.username
  }, "mysecretkey1234", {expiresIn: "3 hours"})

  res
    .status(200)
    .send({access_token: token});
})

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

