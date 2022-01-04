//<<<<<>>>>>>HTMLSelects

const countryList = document.querySelector('#country-list');
const cityList = document.querySelector('#city-list');
const navLinkDiv = document.querySelector('#nav-link');
const navLinks = document.querySelector('#nav-links');

//<<<<<>>>>>>HTMLDivs
const minTempDiv = document.querySelector('.min-temp');
const avgTempDiv = document.querySelector('.avg-temp');
const maxTempDiv = document.querySelector('.max-temp');
const humidityDiv = document.querySelector('.humidity');
const windSpeedDiv = document.querySelector('.wind-speed');
//<<<<<>>>>>>Arrays
let countryNames = ['India', 'USA', 'Japan', 'France', 'Australia'];

let indianCityNames = [
  'New Delhi',
  'Kolkata',
  'Patna',
  'Mumbai',
  'Goa',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Bhopal',
  'Coimbatore',
  'Bhubaneswar',
];
let usaCityNames = ['New York', 'Los Angeles', 'Chicago', 'Las Vegas'];
let japaneseCityNames = [
  'Tokyo',
  'Yokohama',
  'Osaka',
  'Nagoya',
  'Fukuoka',
  'Hiroshima',
];
let frenchCityNames = ['Paris', 'Marseille', 'Nice', 'Nantes'];
let australianCityNames = [
  'Sydney',
  'Melbourne',
  '	Brisbane',
  'Perth',
  'Adelaide',
];
//<<<<<>>>>>>variablesForApi
let infoArr;
let humidity;
let windSpeed;
// let windPressure
let averageTemp;
let maxTemp;
let minTemp;

// functions;

function optionCreator(arrayName, selectedElement) {
  for (let i = 0; i < arrayName.length; i++) {
    let options = document.createElement('option');
    selectedElement.appendChild(options);
    selectedElement.children[i].innerText = arrayName[i];
    selectedElement.children[i].value = arrayName[i];
  }
  return;
}
function cityAccordingTOCountry() {
  if (countryList.value === 'India') {
    optionCreator(indianCityNames, cityList);
  }

  if (countryList.value === 'USA') {
    optionCreator(usaCityNames, cityList);
  }

  if (countryList.value === 'Japan') {
    optionCreator(japaneseCityNames, cityList);
  }

  if (countryList.value === 'France') {
    optionCreator(frenchCityNames, cityList);
  }

  if (countryList.value === 'Australia') {
    optionCreator(australianCityNames, cityList);
  }
}
function fetchData() {
  fetch(
    `https://community-open-weather-map.p.rapidapi.com/climate/month?q=${cityList.value}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': 'ce277218e0mshddd68d9eb18728fp194938jsn4e17f8a09e25',
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      infoArr = data.list;
      const lastElementOfInfoArr = infoArr[infoArr.length - 1];
      humidity = lastElementOfInfoArr.humidity;
      windSpeed = lastElementOfInfoArr.wind_speed;
      averageTemp = lastElementOfInfoArr.temp.average;
      maxTemp = lastElementOfInfoArr.temp.record_max;
      minTemp = lastElementOfInfoArr.temp.record_min;
      maxTemp -= 273;
      minTemp -= 273;
      averageTemp -= 273;
      windSpeed *= 1.6;
      console.log(data);
      dataHandler();
    })
    .catch((err) => {
      console.error(err);
    });
}
function dataHandler() {
  minTempDiv.innerHTML = `<h3>Min.</h3>${minTemp.toFixed(2)} deg C`;
  avgTempDiv.innerHTML = `<h3>Avg.</h3>${averageTemp.toFixed(2)} deg C`;
  maxTempDiv.innerHTML = `<h3>Max.</h3>${maxTemp.toFixed(2)} deg C`;
  humidityDiv.innerHTML = `<h3>Humidity</h3>${humidity.toFixed(2)} %`;
  windSpeedDiv.innerHTML = `<h3>Wind</h3>${windSpeed.toFixed(2)} kmph`;
}

optionCreator(countryNames, countryList);
optionCreator(indianCityNames, cityList);
fetchData();

// addEventListener

countryList.addEventListener('change', () => {
  cityList.innerHTML = '';
  cityAccordingTOCountry();
  fetchData();
  return;
});

cityList.addEventListener('change', () => {
  fetchData();
  return;
});
let j = 1;
navLinkDiv.addEventListener('click', () => {
  j++;
  if (j % 2 === 0) {
    navLinkDiv.style.width = '500px';
    navLinkDiv.style.backgroundColor = 'cornflowerblue';
    navLinks.style.backgroundColor = 'cornflowerblue';
  } else {
    navLinkDiv.style.width = '50px';
  }
});
