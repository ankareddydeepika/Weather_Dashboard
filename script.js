//daily weather URL

function buildQueryUrl() {

    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?";

    var queryParameters = { "appid": "0a0a4078e577711da637196946879a75" };

    queryParameters.q = $("#search-term")
        .val()
        .trim();
    //   console.log(queryUrl + $.param(queryParameters));
    return (queryUrl + $.param(queryParameters));
}

//five day forecast URL

function buildForecastUrl() {

    var queryUrl = "http://api.openweathermap.org/data/2.5/forecast?";

    var queryParameters = { "appid": "0a0a4078e577711da637196946879a75" };
    console.log($("#search-term"))
    queryParameters.q = $("#search-term")
        .val()
        .trim();

    return (queryUrl + $.param(queryParameters));

}


//Coverting date
function convertDate(unixtimestamp) {

    var date = new Date(unixtimestamp * 1000);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    var output = month + "/" + day + "/" + year;
    return output;

}

$("#searchbtn").on("click", function () {

    var weatherUrl = buildQueryUrl();
    var forecasteUrl = buildForecastUrl();
    console.log(weatherUrl);
    console.log(forecasteUrl);

    $.ajax({
        url: weatherUrl,
        method: "GET"
    }).then(response => {

        $("#Weather-forecaste").prepend(`
        <h1>${response.name} (${convertDate(response.dt)})<h1/>
        <p style="font-size:20px">Temperature: ${response.main.temp}<p/>
        <p style="font-size:20px">Humidity: ${response.main.humidity}%<p/>
        <p Style="font-size:20px">Wind Speed: ${response.wind.speed}MPH<p/>
        `);
    })

    $.ajax({
        url: forecasteUrl,
        method: "GET"
    }).then(response =>{

        console.log(response);

        for(i=0; i<response.cnt; i++){

            var weather = response.list[i];
            var str = weather.dt_txt;
            var substr = "12:00:00";

            if(str.includes(substr)){

                $("#fivedayforecaste").append(`
                <div class="card"><div/>
                <div class="card-body">
                <h4>${convertDate(weather.dt)}<h4/>
                <p style="font-size:20px">Temperature: ${weather.main.temp}<p/>
        <p style="font-size:20px">Humidity: ${weather.main.humidity}%<p/>
                </div>             
                `)
            }


        }

    })

});



