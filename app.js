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

    // Create HTML content
    const htmlContent = `
        <h1>New Submission from ${name}</h1>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
    `;

    const mailOptions = {
        from: email,
        to: config.email.receiver.address,
        subject: `Contact form Submission from "${name}"`,
        text: `You have a new submission from ${email} with the following message: ${message}`,
        html: htmlContent  // Add the HTML content here
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
            res.status(500);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200);
        }
    });
});


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})