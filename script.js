document.addEventListener('DOMContentLoaded', () => {
  const link =
    'http://api.weatherstack.com/current?access_key=594776df54ea0423e029762400cfe55f';

  async function getWeather (url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    render(respData);
    getWeatherImg(respData);
  };
  function getWeatherImg (data) {
    switch (data[0]) {
      case 'Light Rain Shower':
      case 'Partly Cloudy':
        return 'cloud';
      case 'Overcast':
      case 'Clear':
        return 'clear';
      case 'Sunny':
        return 'sunny';
    }
  };
  const form = document.querySelector('#form');
  const search = document.querySelector('.form-input');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWeather(`${link}&query=${search.value}`);
    search.value = '';
  });

  const respHTML = (time, temperature, weather, location, humidity) => {
    return ` <div class="close-btn">
      <button>close</button>
              </div>
      <div class="text-info">
      Weather today in:
      <h1 class="city-name">${location}</h1>
      <div class="time-captured">
      as of: ${time}
      <div class="degrees">${temperature}
      <img class="degrees-img" src="img/the.png" alt="">
      </div>
    </div>
    </div>
    <div class="weather-img">
      <img src="img/${getWeatherImg(weather)}.png" alt="" />
      <div class="weather-img-text">${weather}</div>
    </div>
    <div class="add-container">
      <div class="additional">
        <div class="property-icon">
          <img src="img/icons/gauge.png" alt="">
        </div>
        <div class="addtional-info">
          <div class="additional-info-value">123</div>
          <div class="additional-info-name">Humidity</div>
        </div>
        </div>
        <div class="additional">
        <div class="property-icon">
          <img src="img/icons/gauge.png" alt="">
        </div>
        <div class="addtional-info">
          <div class="additional-info-value">123</div>
          <div class="additional-info-name">Humidity</div>
        </div>
        </div>
        <div class="additional">
        <div class="property-icon">
          <img src="img/icons/gauge.png" alt="">
        </div>
        <div class="addtional-info">
          <div class="additional-info-value">${humidity}</div>
          <div class="additional-info-name">Humidity</div>
        </div>
        </div>
      </div>`;
  };

  function render (data) {
    const { current: { observation_time, temperature, weather_descriptions, humidity }, location: { name } } = data;
    const popUp = document.querySelector('.popup');
    popUp.classList.remove('active');
    const respEl = document.querySelector('.response');
    respEl.classList.add('active');
    respEl.insertAdjacentHTML('beforeend', respHTML(observation_time, temperature, weather_descriptions, name, humidity));
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
      respEl.innerHTML = '';
      respEl.classList.remove('active');
      popUp.classList.add('active');
    });
  };
});
