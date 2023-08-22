//local history

var searchHistory = localStorage.getItem('serchHistory')


//forcast api call `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=22ffcf9ab3ce5bcf313e65a60e0935fc`

function searchCity(cityName){
    let apiurl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=22ffcf9ab3ce5bcf313e65a60e0935fc`    
    
    fetch(apiurl)
    .then((Response) => {
      
      
      return Response.json();
    })
    .then((data) => {
      console.log(data);

      return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=22ffcf9ab3ce5bcf313e65a60e0935fc&units=metric
      `)
    }).then((Response) => {
      return Response.json()
    }).then((data) => {
      console.log(data)
      let todayCard = $('#todayForcast')

      todayCard.children('h2').eq(0).text(data.name)
      todayCard.children('p').eq(0).text('Temp: '+ data.main.temp)
      todayCard.children('p').eq(1).text('Wind: '+ data.wind.speed)
      todayCard.children('p').eq(2).text('Humidity: '+ data.main.humidity)

      return fetch('https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=22ffcf9ab3ce5bcf313e65a60e0935fc&units=metric')
    }).then(Response => {
      return Response.json()
    });
}

if(searchHistory !== null){
    searchHistory = JSON.parse(searchHistory)

    searchHistory.forEach(element => {
        let buttonelemnt = $(`<div class="col-12 m-2"> <button type="button" class="btn btn-info btn-block">${element}</button> </div>`)
        // $('<div class="col-12 m-2"> </div>')
        buttonelemnt.attr('data-location', element)
        buttonelemnt.on('click', (event) =>{
            let location = event.target.textContent
            console.log(location)
            searchCity(location)
        } )
        $('#searchHistoryContainer').append(buttonelemnt)
        console.log(buttonelemnt)
    });
}else{
    searchHistory = []
}


//all event handlers 
function buttonClickHandler(){
    let SearchBar = $('#SearchBar')
    
    searchCity(SearchBar.val())

      searchHistory.push(SearchBar.val())

      localStorage.setItem('serchHistory', JSON.stringify(searchHistory))
      SearchBar.val('')
    
}

$('#SearchButton').on('click', buttonClickHandler)
