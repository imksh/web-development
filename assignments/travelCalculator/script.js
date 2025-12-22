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
  if (input <= 10) {
    bill = input * 11;
    charge.push(bill);
  } else if (input <= 90) {
    input = input - 10;
    bill = 10 * 11;
    charge.push(bill);
    bill += input * 10;
    charge.push(input * 10);
  } else {
    input = input - 10;
    bill = 10 * 11;
    charge.push(bill);
    input = input - 90;
    bill += 90 * 10;
    charge.push(90 * 10);
    bill += input * 9;
    charge.push(input * 9);
  }

  first.innerText = charge.at(0)?.toFixed(2) || 0;
  second.innerText = charge.at(1)?.toFixed(2) || 0;
  third.innerText = charge.at(2)?.toFixed(2) || 0;

  grandtotal.innerText = bill?.toFixed(2) || 0;
}

function reset() {
  document.getElementById("input").value = 0;
  document.getElementById("first").innerText = 0;
  document.getElementById("second").innerText = 0;
  document.getElementById("third").innerText = 0;
  document.getElementById("grandtotal").innerText = 0;
}
