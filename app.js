var express = require('express');
var path = require("path");
var moment = require("moment");
var app = express();

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"), function(err) {
        if (err) {
            console.log(err);
        }
    });
});

app.get("/:date", function (req, res) {
    var formattedDate = req.params.date;

    if (parseInt(formattedDate)) {
        var newDate = moment.unix(formattedDate).format("MMMM DD, YYYY");
        res.json({
            unix: Number(formattedDate),
            natural: newDate
        });
    } else {
        res.json({
            unix: "Test",
            natural: "Test"
        });
    }
});

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});
