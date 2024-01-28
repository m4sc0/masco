const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const port = 3000;
const config = require('./public/js/config.json');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.email.receiver.adress,
        pass: config.email.receiver.appPw
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/email', (req, res) => {


    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: config.email.receiver.adress,
        subject: `Contact form Submission from "${name}"`,
        text: `You have a new submission with the following message: ${message}`
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
            res.status(500);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200);
        }
    })
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})