const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=e2ee7e64869c75e3f36fbabefe6442ae&units=imperial';

// const apiBaseURL = "https://deepa-basic-weather-app.herokuapp.com/";

// Create an event listener for the element with the id: generate, with a callback function to execute when it is clicked.
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    e.preventDefault();
    const form = document.forms["journalForm"]["feelings"].value;
    if (form == "") {
        alert("Please describe your mood today.");
        return false;
    } else {
        const zip = document.getElementById('zip').value;
        const journalEntry = document.getElementById('feelings').value;
        getWeather(baseURL, zip, apiKey)
        .then(data => {
            postData('/addEntry', { data: data, mood: journalEntry });
            updateUI();
        });
    };
    clearResults();
};
 
const getWeather = async (baseURL, zip, key) => {
    const response = await fetch(baseURL+zip+key);
    const data = await response.json();
    try {
        return {
            zip: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            description: data.weather[0].description,
            icon: data.weather[0].icon
        };
    } catch (error) {
        console.log("Error", error);
    };
};

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const getData = await response.json();
        return getData;
    } catch (error) {
        console.log("Error:", error);
    };
};

// Update UI
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        for(let i = 0; i < allData.length; i++) {
            const data = allData[i].data;
            const mood = allData[i].mood;
            let d = new Date();
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];       
            document.querySelector('.current-date').textContent = `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`;
            document.querySelector('.name').textContent = `${data.zip}, ${data.country}`;
            document.querySelector('.current-weather').textContent = `${data.description}`;
            document.querySelector('.temp').textContent=`${data.temp}`+ `°F`;
            document.querySelector('.weather-icon').src = `http://openweathermap.org/img/w/${data.icon}.png`;
            document.querySelector('.mood').textContent = `${mood}`;

        }
    } catch (error) {
        console.log("Error", error);
        alert('zip/State not found');
    };
};

function clearResults() {
    const form = document.forms["journalForm"];
    form.reset();
};





// /* Global Variables */
// const openWeatherURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// // Personal API Key for OpenWeatherMap API
// const openWeatherMapAPIKey = "e2ee7e64869c75e3f36fbabefe6442ae&units=imperial";


// document.getElementById("generate").addEventListener("click", () => getDataFromOpenWeatherAPI(openWeatherMapAPIKey));


// /* Function to GET Web API Data*/
// async function getDataFromOpenWeatherAPI(apiKey) {
//     let zipCode = document.getElementById("zip").value;
//     fetch(openWeatherURL + zipCode + ",us&appid=" + apiKey).then((response) => {
//         return response.json();
//     }).then((result) => {
//         postProjectData(result.main.temp);
//     });
// }

// /* Asynchronus function for GET API call to GET Project Data */
// async function getProjectData() {
//     fetch(apiBaseURL + 'projectData').then((response) => {
//         return response.json();
//     }).then((result) => {
//         document.getElementById("date").innerHTML = result.date;
//         document.getElementById("temp").innerHTML = JSON.stringify(result.temp) + "°C";
//         document.getElementById("content").innerHTML = result.content;
//         document.getElementById("zip").value = "";
//         document.getElementById("feelings").value = "";
//     });
// }

// /* Asynchronus function for POST API call to POST Project Data */
// async function postProjectData(temp) {

//     // Creating date instance using JS date function
//     let d = new Date();
//     let newDate = d.getMonth()+ 1 + '/' + d.getDate() + '/' + d.getFullYear();
//     let content = document.getElementById("feelings").value;
//     let data = {
//         date: newDate,
//         temp: temp,
//         content: content,
//     };
//     let options = {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data),
//     };
//     fetch(apiBaseURL + 'projectData', options).then((response) => {
//         return response.json();
//     }).then((result) => {
//         getProjectData()
//     });
// }