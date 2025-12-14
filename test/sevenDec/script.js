function enroll() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const number = document.getElementById("number").value.trim();
  const course = document.getElementById("course").value.trim();
  const gender = document.getElementById("gender").value.trim();
  const branch = document.getElementById("branch").value.trim();
  const college = document.getElementById("college").value.trim();

  if (name && email && number && course && gender && branch && college) {
    alert(`Thank you for Enrolling, ${name}!`);
    return;
  } else {
    alert("Please Complete the form");
  }
}

function contact() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value;

  if (name && email && message) {
    alert(`Thank you for contacting us, ${name}!`);
    return;
  } else {
    alert("Please Complete the Contact form");
  }
}
