const express = require('express')
const app = express()
const port = 3000

const route = require("./routes");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

route(app);

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})