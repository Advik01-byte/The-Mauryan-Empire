// Empire map: click a city to read its story.
const cities = document.querySelectorAll('.city');
const cityName = document.querySelector('.js-city-name');
const cityInfo = document.querySelector('.js-city-info');
cities.forEach((city) => {
  city.addEventListener('click', () => {
    cityName.textContent = city.dataset.name;
    cityInfo.textContent = city.dataset.info;
  });
});
