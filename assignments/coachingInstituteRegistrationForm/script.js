function handleSubmit(e) {
  e.preventDefault();
  document.querySelectorAll(".error").forEach((item) => (item.innerHTML = ""));
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value;
  const number = document.getElementById("number").value;
  const dob = document.getElementById("dob").value;
  const qualifications = document.getElementById("qualifications").value;
  const percent = document.getElementById("percent").value;
  const course = document.getElementById("course").value;
  const timing = document.getElementById("timing").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const pin = document.getElementById("pin").value.trim();
  const gaurdian = document.getElementById("gaurdian").value;
  const gaurdianNumber = document.getElementById("gaurdianNumber").value;
  const hearAbout = document.getElementById("hearAbout").value;
  const requirement = document.getElementById("requirement").value;


  if (!/^[A-Za-z ]+$/.test(name)) {
    document.getElementById("nameError").innerText =
      "Please enter a valid name";
    return;
  }
  if (!/^[\w\.]+@[A-Za-z]+\.[A-Za-z]+$/.test(email)) {
    document.getElementById("emailError").innerText =
      "Please enter a valid email address";
    return;
  }

  if (!/^[6-9]\d{9}$/.test(number)) {
    document.getElementById("numberError").innerText =
      "Enter a 10-digit Indian mobile number";
    return;
  }

  if(!dob){
    document.getElementById("dobError").innerText =
      "Enter your Date of Birth";
      return;
  }

  const today = new Date();
  const age = today.toISOString().split("-")[0]-dob.split("-")[0];
  if(age<15){
    document.getElementById("dobError").innerText =
      "You must be at least 15 years old";
    return;
  }

  if (!qualifications) {
    document.getElementById("qualificationsError").innerText =
      "Please select a qualification";
    return;
  }

  if (percent < 0 || percent > 100) {
    document.getElementById("percentError").innerText =
      "Enter a valid percentage or grade";
    return;
  }
  console.log(percent.toLowerCase());

  if (
    percent.length !== 1 ||
    percent.toLowerCase() < "a" ||
    percent.toLowerCase() > "f"
  ) {
    document.getElementById("percentError").innerText =
      "Enter a valid percentage or grade";
    return;
  }

  if (!course) {
    document.getElementById("courseError").innerText =
      "Please select a qualification";
    return;
  }

  if (!timing) {
    document.getElementById("timingError").innerText = "Select a batch timing";
    return;
  }

  if (!address) {
    document.getElementById("timingError").innerText =
      "Enter your full address";
    return;
  }

  if (!/^[A-Za-z ]+$/.test(city)) {
    document.getElementById("cityError").innerText =
      "Please enter a valid city name";
    return;
  }

  if (!/^\d{6}$/.test(pin)) {
    document.getElementById("pinError").innerText =
      "Enter a valid 6-digit pin code";
    return;
  }

  if (!/^[A-Za-z ]+$/.test(gaurdian)) {
    document.getElementById("gaurdianError").innerText =
      "Enter guardian's full name";
    return;
  }

  if (!/^[6-9]\d{9}$/.test(gaurdianNumber)) {
    document.getElementById("gaurdianNumberError").innerText =
      "Enter a valid 10-digit contact number";
    return;
  }

  if (!hearAbout) {
    document.getElementById("hearAboutError").innerText = "Select an option";
    return;
  }
}
