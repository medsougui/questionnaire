const express = require("express");
const app = express();
const cors = require('cors');
const {router} = require("./1api")

app.use(express.json());
app.use(cors());
app.use(router)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
