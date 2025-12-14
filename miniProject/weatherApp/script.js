const id = "346cb5b68ba7d1ed6fd157f4a3876e27";

const animation = lottie.loadAnimation({
  container: document.getElementById("lottie"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "./src/rainy.json",
});

const animation1 = lottie.loadAnimation({
  container: document.getElementById("loading"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "./src/loading.json",
});

async function getWeather() {
  document.getElementById("btn").disabled = true;
  const city = document.getElementById("city").value.trim();
  const lottie = document.getElementById("lottie");
  const name = document.getElementById("name");
  const animationDiv = document.getElementById("animation");
  if (!city) {
    animationDiv.classList.add("bigDiv");
    animationDiv.classList.remove("smallDiv");
    lottie.classList.add("lottieBig");
    lottie.classList.remove("lottieSmall");
    document.getElementById("loading").classList.remove("d-none");
    document.getElementById("loading").classList.add("d-block");
    document.getElementById("lottie").classList.add("d-none");
    document.getElementById("lottie").classList.remove("d-block");
    document.getElementById("weatherData").innerHTML = "";
    name.innerText = "";
    setTimeout(() => {
      document.getElementById("btn").disabled = false;
      document.getElementById("loading").classList.remove("d-block");
      document.getElementById("loading").classList.add("d-none");
      document.getElementById("lottie").classList.add("d-block");
      document.getElementById("lottie").classList.remove("d-none");
    }, 1000);
    return;
  }
  animationDiv.classList.add("bigDiv");
  animationDiv.classList.remove("smallDiv");
  lottie.classList.add("lottieBig");
  lottie.classList.remove("lottieSmall");
  document.getElementById("loading").classList.remove("d-none");
  document.getElementById("loading").classList.add("d-block");
  document.getElementById("lottie").classList.add("d-none");
  document.getElementById("lottie").classList.remove("d-block");
  document.getElementById("weatherData").innerHTML = "";
  name.innerText = "";

  const { lat, lon } = await geoLocation(city);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${id}`
  );
  const data = await response.json();

  setTimeout(() => {
    document.getElementById("btn").disabled = false;
    animationDiv.classList.remove("bigDiv");
    animationDiv.classList.add("smallDiv");
    lottie.classList.remove("lottieBig");
    lottie.classList.add("lottieSmall");
    document.getElementById("loading").classList.remove("d-block");
    document.getElementById("loading").classList.add("d-none");
    document.getElementById("lottie").classList.add("d-block");
    document.getElementById("lottie").classList.remove("d-none");
    const capital = city.split("");
    capital[0] = capital[0].toUpperCase();
    name.innerText = capital.join("");
    document.getElementById("weatherData").innerHTML = `<div>
              <p>Temperature: ${(data.main.temp - 273.14).toFixed(2)}℃</p>
              <p>Humidity: ${data.main.humidity}%</p>
              <p>Description: ${data.weather[0].description}</p>
            </div>
            <img
              src="https://openweathermap.org/img/wn/${
                data.weather[0].icon
              }@4x.png"
              alt="weatherIcon"
            />
          </div>`;
  }, 500);
}

async function geoLocation(city) {
  console.log(city, id);
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${id}`
  );
  const data = await res.json();
  const lat = data[0].lat;
  const lon = data[0].lon;
  console.log(lat, lon);

  return { lat, lon };
}
