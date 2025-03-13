const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'behnaz1rahgozar1@gmail.com',
        pass: 'wwmp bgvm qlme yumq'
    }
});

app.post('/send-email', (req, res) => {
    const { to, subject, htmlContent } = req.body;

    const mailOptions = {
        from: 'behnaz1rahgozar1@gmail.com',
        to: to,
        subject: subject || 'HTML Email',
        html: htmlContent
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ message: 'Email sent successfully', info: info.response });
        }
    });
});

const PORT = 3000;
app.post('/proxy-fetch', async (req, res) => {
    const { url } = req.body;
    
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const allowList = ['https://example.com', 'https://another-allowed-domain.com'];
    const isValidUrl = allowList.some(allowedUrl => url.startsWith(allowedUrl));

    if (!isValidUrl) {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    try {
        const response = await axios.get(url);
        res.json({ html: response.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
