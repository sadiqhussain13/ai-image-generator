const PORT = process.env.PORT || 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/image', async (req, res) => {
    try {
        const apiResponse = await axios.post(
            "https://api-inference.huggingface.co/models/alvdansen/littletinies",
            JSON.stringify(req.body),
            {
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_HUGGINGFACE_API}`,
                    "Content-Type": "application/json",
                },
                responseType: 'arraybuffer'
            }
        );

        if (!apiResponse.data) {
            throw new Error('No data returned from API');
        }

        res.set('Content-Type', 'image/jpeg');
        res.set('Content-Disposition', 'attachment; filename="image.jpg"');
        res.send(apiResponse.data);
    } catch (error) {
        console.error("Error generating image:", error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

