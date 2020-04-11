# Weather_Dashboard

Created a the weather outlook for multiple cities so that user can plan a trip accordingly

## Criteria

When user search for a city
User is presented with current and future conditions for that city and that city is added to the search history
When user view current weather conditions for that city
User is presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
Then user is also presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
When user open the weather dashboard then he is presented with the last searched city forecast

## To achive the above criteria

1. Created layout for the page using rows, coloumns and cards using Jquery and Bootstrap.
2. Created a function to populate previous searches while clicking search icon
3. Created a function to Coverte date.
4. Used three ajax calls to populate the weather data

API used: http://api.openweathermap.org/data/2.5/forecast?
         https://api.openweathermap.org/data/2.5/weather?
         http://api.openweathermap.org/data/2.5/uvi?

Application Link:  

![weatherdashboard](./Assets/Weather_dashboard.gif)