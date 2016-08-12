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

    // Check for number and return date
    if (parseInt(formattedDate)) {
        var newDate = moment.unix(formattedDate).format("MMMM DD, YYYY");
        res.json({
            unix: Number(formattedDate),
            natural: newDate
        });
    // Check for date and return unix time
    } else if (moment(formattedDate).isValid()) {
        var unixTime = moment(formattedDate).format("X");
        res.json({
            unix: unixTime,
            natural: moment(formattedDate).format("MMMM DD, YYYY")
        });
    // Invalid input so return null
    } else {
        res.json({
            unix: null,
            natural: null
        });
    }
});

app.listen(process.env.PORT || 3000, function () {
    console.log('App Started');
});
