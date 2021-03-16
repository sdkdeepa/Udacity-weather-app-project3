const express = require('express');
const app = express();

/* Middleware */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialise the main project folder
app.use(express.static('website'));

const projectData = [];

// Initialize all route with a callback function
app.get('/all', getData);

// GET API to get the project data
function getData(req, res) {
    res.send(projectData);
    console.log(projectData);
};

// POST route with a callback function
app.post('/addEntry', (req, res) => {
    const entry = req.body;
    projectData.push(entry);
    res.json(projectData);
});

/* Spin up the server*/
// added process.env.port for deploying app in heroku

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Weather app is runnning localhost: ${port}`));