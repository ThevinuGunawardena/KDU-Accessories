const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Setup multer for file upload
const upload = multer({ dest: 'uploads/' });

// Setup email transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kduhonourtg@gmail.com',
        pass: 'Tgmali@1219kissed'
    }
});

app.use(express.static('public'));

// File upload endpoint
app.post('/upload', upload.single('payment-slip'), (req, res) => {
    const file = req.file;
    const mailOptions = {
        from: 'kduhonourtg@gmail.com',
        to: 'thevinuvinan@gmail.com',
        subject: 'New Payment Slip Received',
        text: `A new payment slip has been uploaded. Details:\n\nFilename: ${file.originalname}\nPath: ${file.path}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email.');
        }
        
        // Optionally, delete the file after sending the email
        fs.unlink(file.path, err => {
            if (err) console.error('Failed to delete file:', err);
        });

        res.status(200).send('Payment slip uploaded and email sent.');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
