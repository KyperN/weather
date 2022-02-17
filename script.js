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
      case 'Partly cloudy':
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

  const respHTML = (time, temperature, weather, location, humidity, uvIndex, visibility) => {
    return ` <div class="button">
      <button class="close-btn">Refresh</button>
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
          <img src="img/icons/visibility.png" alt="">
        </div>
        <div class="addtional-info">
          <div class="additional-info-value">${visibility}</div>
          <div class="additional-info-name">Visibility</div>
        </div>
        </div>
        <div class="additional">
        <div class="property-icon">
          <img src="img/icons/uv-index.png" alt="">
        </div>
        <div class="addtional-info">
          <div class="additional-info-value">${uvIndex}</div>
          <div class="additional-info-name">UV Index</div>
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
    const { current: { observation_time, temperature, weather_descriptions, humidity, uv_index, visibility }, location: { name } } = data;
    const popUp = document.querySelector('.popup');
    popUp.classList.remove('active');
    const respEl = document.querySelector('.response');
    respEl.classList.add('active');
    respEl.insertAdjacentHTML('beforeend', respHTML(observation_time, temperature, weather_descriptions, name, humidity, uv_index, visibility));
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
      respEl.innerHTML = '';
      respEl.classList.remove('active');
      popUp.classList.add('active');
    });
  };
});
