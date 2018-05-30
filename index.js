const express = require('express')
const app = express()
const path = require('path')
const moment = require('moment')

const port = process.env.PORT || 3000;

//A few common date formats to search for
const formats = [
    "MMMM D, YYYY",
    "MM-DD-YYYY",
    "M-DD-YYYY",
    "M-D-YYYY"
];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.get('/:data', (req, res) => {
    var data = req.params.data;
    var output;
    if (data.match("^[0-9]+$")) {
        output = moment.utc(data, "X");
    } else {
        output = moment.utc(data, formats, true);
    }

    if (output.isValid()) {
        res.json({
            natural: output.format("MMMM D, YYYY"),
            unix: output.format("X")
        })
    } else {
        res.json({
            natural: null,
            unix: null
        })
    }
})

app.listen(port, () => {
    console.log('listening on port ' + port)
})
