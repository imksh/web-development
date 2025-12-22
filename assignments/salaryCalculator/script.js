function calculate() {
  let input = document.getElementById("input").value;
  reset();
  document.getElementById("input").value = input;
  const first = document.getElementById("first");
  const second = document.getElementById("second");
  const third = document.getElementById("third");
  const grandtotal = document.getElementById("grandtotal");
  const err = document.getElementById("error");
  err.innerText = "";
  if (!input) {
    err.innerText = "Enter the Data";
    return;
  }

  const charge = [];

  if (input < 0) {
    err.innerText = "Enter positive value only";
    return;
  }
  const basic = Number(input);

  const hra = basic * 0.2;
  const da = basic * 0.1;
  const gross = basic + hra + da;

  first.innerText = basic.toFixed(2) || 0;
  second.innerText = hra.toFixed(2) || 0;
  third.innerText = da.toFixed(2) || 0;

  grandtotal.innerText = gross?.toFixed(2) || 0;
}

function reset() {
  document.getElementById("input").value = 0;
  document.getElementById("first").innerText = 0;
  document.getElementById("second").innerText = 0;
  document.getElementById("third").innerText = 0;
  document.getElementById("grandtotal").innerText = 0;
}
