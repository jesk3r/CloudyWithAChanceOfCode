fetch(
  "https://api.openweathermap.org/data/2.5/forecast?lat=51.5073219&lon=-0.1276474&appid=22ffcf9ab3ce5bcf313e65a60e0935fc"
).then(Response =>{
    console.log(Response)
    return Response.json()
}).then(data => {
    console.log(data)
});
