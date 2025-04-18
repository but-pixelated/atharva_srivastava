const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/contact', async(req, res) => {
    const { name, email, message } = req.body;
    console.log('Received contact form:', { name, email, message });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'atharvasrivastava9990@gmail.com',
            pass: 'wthq nfqb uswv jhvj'
        }
    });
    const mailOptions = {
        from: email,
        to: 'atharvasrivastava9990@gmail.com',
        subject: `Message from ${name}`,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ success: true, msg: 'email sent!' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, msg: 'failed to send email' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));