import dotenv from "dotenv"

dotenv.config()
const key = process.env.API_KEY

/*
steps:
1. define url
2. fetch data
3. error check
4. log data
*/

// define url
const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/32817?key=${key}`;

// fetch data
fetch(apiUrl)
    // error check
    .then(response => {
        if (!response.ok) {
            if (response.status == 404) {
                throw new Error ('Data not found.');
            }
            else if (response.status == 500) {
                throw new Error ('Server error');
            }
            else {
                throw new Error ('Network response was not ok.');
            }
        }
        return response.json();
    })

    .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        })