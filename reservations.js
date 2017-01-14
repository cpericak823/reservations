/*packages to install
express
bodyparser
path

set port and ensure connection is listening

HTML
3 pages (home, reservation, table)
make sure to link to each page which is its own api and display json objects
create clear table function
*/

//Require node modules
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//Global Variables

var app = express();
var PORT = 3000;
var tables = [];
var waitlist = [];

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//link to the home page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

//link to the make reservations page
app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

//link to the view reservations page
app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

// Route to api/tables
app.get("/api/tables", function(req, res) {
    res.json(tables);
});

// Route to api/waitlist
app.get("/api/waitlist", function(req, res) {
    res.json(waitlist);
});

// // Route to CLEAR TABLE
// app.get("/api/cleartable", function(req, res) {
//     console.log('CLEAR TABLE');
//     res.end();
// });

// Route to create reservation
app.post("/api/tables", function(req, res) {
    var newTable = req.body;
    var listType;
    console.log(newTable);
    if (tables.length < 5) {
        listType = 'reservation';
        tables.push(newTable);
    } else {
        listType = 'waitlist';
        waitlist.push(newTable);
    }

    console.log('Tables: ' + JSON.stringify(tables));
    console.log('Waitlist: ' + JSON.stringify(waitlist));

    res.send(listType);
});

app.get('/clear', function(req, res) {
    tables = [];
    waitlist = [];
});

//Listen to the server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
