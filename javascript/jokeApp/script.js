async function getJoke() {
  document.getElementById("setup").innerText = "Loading...";
  document.getElementById("btn").disabled = true;
  const res = await fetch("https://official-joke-api.appspot.com/jokes/random");
  const data = await res.json();
  document.getElementById("btn").disabled = false;
  document.getElementById("setup").innerText = data.setup;
  document.getElementById("punchline").innerText = data.punchline;
}
