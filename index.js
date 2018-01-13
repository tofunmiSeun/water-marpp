const express = require('express')
const app = express()

app.use(express.static('public'))
app.get('/', (req, res) => res.sendFile('C:\\version-control\\water-marks\\index.html'));

app.listen(3000, "127.0.0.1", () => console.log('Example app listening on port 3000!'));