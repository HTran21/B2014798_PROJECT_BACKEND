const express = require('express')
const app = express()
const port = 3000
const path = require('path');

const cors = require('cors');

const route = require("./routes");

const db = require('./app/utils/mongodb.util')

app.use(cors());

// static router
app.use(express.static(path.join(__dirname, "upload")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


db.connect();

route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})