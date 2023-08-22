var searchHistory = localStorage.getItem('serchHistory')



function searchCity(cityName){
    //api url
    let apiurl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=22ffcf9ab3ce5bcf313e65a60e0935fc`    
    
    fetch(apiurl)
    .then((Response) => {
      //turn response into json
      return Response.json();
    })
    .then((data) => {
      
      //thow invlaid data if data does not exist
      

      if(data.length === 0){
        //throw error
        throw new Error('No city was found with that name')
      }

      //add button add save data
      if(!searchHistory.includes(data[0].name)){
        let buttonelemnt = $(`<div class="col-12 m-2"> <button type="button" class="btn btn-info btn-block">${data[0].name}</button> </div>`)
        // $('<div class="col-12 m-2"> </div>')
        buttonelemnt.attr('data-location', data[0].name)
        buttonelemnt.on('click', (event) =>{
            let location = event.target.textContent
           
            searchCity(location)
        } )
        $('#searchHistoryContainer').append(buttonelemnt)

        searchHistory.push(data[0].name)

        localStorage.setItem('serchHistory', JSON.stringify(searchHistory))
      }


      return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=22ffcf9ab3ce5bcf313e65a60e0935fc&units=metric
      `)


    }).then((Response) => {
      return Response.json()
    }).then((data) => {
     
      let todayCard = $('#todayForcast')
    

  
      todayCard.children('h2').eq(0).children('p').text((data.name + " " + dayjs().format('M/D/YYYY')))
      todayCard.children('h2').eq(0).children('span').eq(0).children('img').eq(0).attr('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png` )
      //todayCard.children('h2').eq(0).children('span').eq(0).attr('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`)
      
      todayCard.children('p').eq(0).text('Temp: '+ data.main.temp)
      todayCard.children('p').eq(1).text('Wind: '+ data.wind.speed)
      todayCard.children('p').eq(2).text('Humidity: '+ data.main.humidity)

      return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=22ffcf9ab3ce5bcf313e65a60e0935fc&units=metric`)
    }).then(Response => {
      return Response.json()
    }).then((data) => {
      let fristCard = $('#forecast-card-1')
      

      for (let i = 0; i < 6; i++) {
        let index;
        if(i === 0){
          index = i * 8 
        }else{
          index = i * 8 -1
        }
      
        
        fristCard = $(`#forecast-card-${(i+1)}`)
        fristCard.children('p').eq(0).text( data.list[index].dt_txt.split(' ')[0].replaceAll('-','/'))
        fristCard.children('img').eq(0).attr('src', `http://openweathermap.org/img/w/${data.list[index].weather[0].icon}.png`)
        fristCard.children('p').eq(1).text("Temp: " +data.list[index].main.temp + ' °C')
        fristCard.children('p').eq(2).text('Wind: ' + data.list[index].wind.speed + ' KPH')
        fristCard.children('p').eq(3).text('Humidity: ' + data.list[index].main.humidity + " %")
      }

      


    }).catch( (error) => {
      window.alert('A city with that name was not found')
    });
}

//load the data when script is loaded
if(searchHistory !== null){
    searchHistory = JSON.parse(searchHistory)

    searchHistory.forEach(element => {
        let buttonelemnt = $(`<div class="col-12 m-2"> <button type="button" class="btn btn-info btn-block">${element}</button> </div>`)
        // $('<div class="col-12 m-2"> </div>')
        buttonelemnt.attr('data-location', element)
        buttonelemnt.on('click', (event) =>{
            let location = event.target.textContent
           
            searchCity(location)
        } )
        $('#searchHistoryContainer').append(buttonelemnt)
       
    });
}else{
    searchHistory = []
}

//Histroy Button Event Handler
function buttonClickHandler(){
    let SearchBar = $('#SearchBar')

    //stop code if search bar is empty
    if(!SearchBar.val()){
      return 
    }
    
    
    //search city if the serach has a value
    searchCity(SearchBar.val().split(' ')[0])

    //clear the search bar
    SearchBar.val('')
    
}

$('#SearchButton').on('click', buttonClickHandler)
