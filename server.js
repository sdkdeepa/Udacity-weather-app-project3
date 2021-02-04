
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");
const cors = require("cors");

/* Middleware*/
/*Here we are configuring express to use body-parser as middle-ware.
Cors for cross origin allowance */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));



// Initialize all route with a callback function
app.get("/projectData", sendData);

// GET API to get the project data
function sendData(request, response) {
  response.json(projectData);
}

// POST route with a callback function
app.post("/projectData", callBack);

function callBack(req, res) {
  projectData = req.body;
  res.json({
    "success":true,
})
}
/* Spin up the server*/
const port = 8080;
const server = app.listen(port, listening);
 function listening(){
    console.log(server);
    console.log(`running on localhost: ${port}`);
  };