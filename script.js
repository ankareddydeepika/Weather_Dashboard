//Global Variable for storing searches
var savedSearches = new Array();
//when refreshing
var a = localStorage.getItem("lastsearcheditem")
if (a !== "") {
    search(a)
}
//populate prevous searches
function populatePreviousSearches(){
    if (savedSearches.length === 9) {
        savedSearches.shift()
    }
    savedSearches.push($("#search-term").val().trim());
    for(i=0; i<savedSearches.length; i++){

        $("#previous-searches").prepend("<br><hr>" + savedSearches[i]);
    } 
}
function clear() {
    $("#previous-searches").empty()
    $("#Weather-forecaste").empty()
    $("#fivedayforecaste").empty()
}
//daily weather URL

function buildQueryUrl(searchterm) {

    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?";

    var queryParameters = { "appid": "0a0a4078e577711da637196946879a75" };

    queryParameters.q = searchterm
    queryParameters.units="imperial"
    //   console.log(queryUrl + $.param(queryParameters));
    return (queryUrl + $.param(queryParameters));
}

//five day forecast URL

function buildForecastUrl(searchterm) {

    var queryUrl = "http://api.openweathermap.org/data/2.5/forecast?";

    var queryParameters = { "appid": "0a0a4078e577711da637196946879a75" };
    console.log(searchterm)
    queryParameters.q = searchterm
    queryParameters.units="imperial"

    return (queryUrl + $.param(queryParameters));

}

//UV URL

function buildUVurl(lati,long){

    var queryUrl = "http://api.openweathermap.org/data/2.5/uvi?";

    var queryParameters = {"appid":"0a0a4078e577711da637196946879a75"};

    queryParameters.lat = lati
    queryParameters.lon = long

    return(queryUrl + $.param(queryParameters));
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
// Creating function to search, while clicking search icon
function search(searchterm){
    clear()
    
    localStorage.setItem("lastsearcheditem", searchterm)
    var weatherUrl = buildQueryUrl(searchterm);
    var forecasteUrl = buildForecastUrl(searchterm);
    
    console.log(weatherUrl);
    console.log(forecasteUrl);

    populatePreviousSearches();



//Current weather forecaste
    $.ajax({
        url: weatherUrl,
        method: "GET"
    }).then(response => {
console.log(response)
        $("#Weather-forecaste").prepend(`
        <h1>${response.name} (${convertDate(response.dt)})<h1/>
        <p style="font-size:20px">Temperature: ${response.main.temp}<p/>
        <p style="font-size:20px">Humidity: ${response.main.humidity}%<p/>
        <p Style="font-size:20px">Wind Speed: ${response.wind.speed}MPH<p/>
        `);

        //UV
        var UVUrl = buildUVurl(response.coord.lat, response.coord.lon);
        $.ajax({
            url: UVUrl,
            method: "GET"
        }).then(response =>{
    
            var uvValue = response.value

            var background;

            if(uvValue === 3 || uvValue <= 5){

                background = "yellow";
            }
            else if(uvValue === 6 || uvValue <= 7){

                background = "orange";
            }
            else if(uvValue === 8 || uvValue <= 10){

                background = "red";
            }
            else{

                background = "violet";
            }
            
            $("#Weather-forecaste").append(`
            <div class="card" style="width: 8rem" >
            <div class="card-body"  style="background-color: ${background}"><p Style="font-size:20px">UV: ${uvValue} <p/>
            </div>
            </div>
            `);

            
        })

    })
   


//Five day forecaste
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
}



$("#searchbtn").on("click", function () {
    
search($("#search-term").val().trim())


});



