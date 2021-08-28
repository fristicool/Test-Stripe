const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");
const { send } = require("express/lib/response");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to FunOfHeuristic <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL.toString(),
      pass: process.env.PASSWORD.toString()
    }
  });

  let mailOptions = {
    from: 'beelden.com', // sender address
    to: user.email, // list of receivers
    subject: "Varification Email", // Subject line
    html: `
    <div style="text-align: center;">
      <h1>Danku om een beeltje bij ons te kopen</h1>
      <br>
      <h2>Hou deze email gooed bij als u uw bestelling komt ophalen</h2>
      <br>
      <p>adres boekhout straat 12</p>
    </div>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);

  console.log('mail send 👻👻👻')
}

// main().catch(console.error);