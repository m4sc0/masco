const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const port = 3000;
const fs = require("fs");
const configPath = "./public/js/config.json";
const config = require(configPath);

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.email.receiver.adress,
        pass: config.email.receiver.appPw,
    },
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/strichliste", (req, res) => {
    res.sendFile(__dirname + '/public/strichliste/index.html');
})

app.get("/strichliste/add/mj", (req, res) => {
    updateCounter(1, "mj");
    res.sendStatus(200);
});

app.get("/strichliste/add/philip", (req, res) => {
    updateCounter(1, "philip");
    res.sendStatus(200);
});

app.get("/strichliste/remove/mj", (req, res) => {
    if (config.strichliste.counter <= 0) {
        res.sendStatus(403);
        return;
    }
    updateCounter(-1, "mj");
    res.sendStatus(200);
});

app.get("/strichliste/remove/philip", (req, res) => {
    if (config.strichliste.counter <= 0) {
        res.sendStatus(403);
        return;
    }
    updateCounter(-1, "philip");
    res.sendStatus(200);
});

app.post("/strichliste/set/mj", (req, res) => {
    if (req.body.value) {
        setCounter(req.body.value, req.body.person);
        res.sendStatus(200);
        return;
    }
    res.sendStatus(500);
})

app.post("/strichliste/set/philip", (req, res) => {
    if (req.body.value) {
        setCounter(req.body.value, req.body.person);
        res.sendStatus(200);
        return;
    }
    res.sendStatus(500);
})

app.get("/strichliste/info", (req, res) => {
    res.status(200).json({ 
        mj: {
            counter: config.strichliste.mj.counter
        },
        philip: {
            counter: config.strichliste.philip.counter
        }
     });
});

function updateCounter(change, person) {
    setCounter(parseInt(config.strichliste[person].counter) + parseInt(change), person);
}

function setCounter(value, person) {
    config.strichliste[person].counter = value;

    fs.writeFile(configPath, JSON.stringify(config, null, 2), err => {
        if (err) {
            console.error('Error writing to file: ', err);
        } else {
            console.log('Config file updated successfully');
        }
    })
}

app.post("/email", (req, res) => {
    const { name, email, message } = req.body;
    const htmlContent = `
        <h1>New Submission from ${name}</h1>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
    `;

    const mailOptions = {
        from: email,
        to: config.email.receiver.adress,
        subject: `Contact form Submission from "${name}"`,
        text: `You have a new submission from ${email} with the following message: ${message}`,
        html: htmlContent,
    };

    transporter
        .sendMail(mailOptions)
        .then((info) => {
            console.log("Email sent: " + info.response);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.error(error);
            res.sendStatus(500);
        });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Listening at http://localhost:${port}`)
})