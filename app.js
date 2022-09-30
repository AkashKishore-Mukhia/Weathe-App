document.addEventListener("DOMContentLoaded", ()=> {
  const btn = document.getElementById('btn');
  const img = document.getElementById('image');
  const wait = document.getElementById('wait');
  const temperature = document.querySelector('#temp > span');
  const wind = document.querySelector('#wind > span');
  const iconEle = document.querySelector('.icon-img');
  const humidityEle = document.querySelector('.humidity > span');
  const cityName = document.querySelector('.city-name > span');
  const descriptionEle = document.querySelector('.description');
  btn.addEventListener("click", fetchApi);

  //global variables
  var value = null;
  // var obj;

  function fetchApi() {
    // showFlag();
    showWeather();
  }


  async function showWeather() {
    let inputValue = document.getElementById('input');
    // if(inputValue.value == "") {
    //   alert('Please enter a valid city name!');
    //   return;
    // }
    await fetchWeather(inputValue.value);

  }

  function fetchWeather(inputValue) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=4e0d650536803930cc5060525bb0b377`)
      .then((response)=>response.json())
      .then((data)=>displayWeather(data))
      .catch((err) => alert(`No city with name "${inputValue}"!`))
  }

  function displayWeather(data) {
    console.log(data);
    const {name} = data;
    const {icon, description} = data.weather[0];
    const {temp, humidity} = data.main;
    const {speed} = data.wind;
    
    temperature.innerHTML =  parseInt(temp - 273.15);
    wind.innerHTML = speed;
    iconEle.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    humidityEle.innerHTML = humidity;
    cityName.innerHTML = name;
    descriptionEle.innerHTML = description;
  }




  function showFlag() {
    wait.innerHTML = "Please Wait...";
    const input = document.getElementById('input');
    value = input.value;
    fetchFlag();
  }

  function fetchFlag() {

    if(value == "") {
      alert('please enter a value first');
      wait.innerHTML = "";
    }else {
      fetch('https://restcountries.com/v3.1/name/'+value+'?fullText=true')
      .then((res)=>res.json())
      .then((data)=>{
        img.src = data[0].flags.png;
        wait.innerHTML = "";
      })
      .catch((err)=>{
        alert(`No country with name "${value}" found!`);
        wait.innerHTML = "";
      })
      input.value = "";
      
    }
  }



})




