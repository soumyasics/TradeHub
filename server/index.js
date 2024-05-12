const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4033;
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({message: "Trade hub home route is working."})
})

app.listen(PORT, () => {
    console.log("Server running on http://localhost:"+PORT);
})
