function calculate() {
  let unit = document.getElementById("unit").value;
  reset();
  document.getElementById("unit").value = unit;
  const first = document.getElementById("first");
  const second = document.getElementById("second");
  const third = document.getElementById("third");
  const fourth = document.getElementById("fourth");
  const subtotal = document.getElementById("subtotal");
  const surcharge = document.getElementById("surcharge");
  const grandtotal = document.getElementById("grandtotal");

  if (!unit) {
    alert("Enter the Data");
    return;
  }

  const charge = [];

  if (unit < 0) {
    alert("Enter positive value only");
    return;
  }
  let bill = 0;
  if (unit > 450) {
    bill = 50 * 0.5;
    charge.push(bill);
    unit = unit - 50;
    bill += 150 * 0.75;
    charge.push(150 * 0.75);
    unit = unit - 150;
    bill += unit * 1.2;
    charge.push(unit * 1.2);
    unit = unit - 250;
    bill += unit * 1.5;
    charge.push(unit * 1.5);
  } else if (unit > 200) {
    bill = 50 * 0.5;
    charge.push(50 * 0.5);
    unit = unit - 50;
    bill += 150 * 0.75;
    charge.push(150 * 0.75);
    unit = unit - 150;
    bill += unit * 1.2;
    charge.push(unit * 1.2);
  } else if (unit > 50) {
    bill = 50 * 0.5;
    charge.push(50 * 0.5);
    unit = unit - 50;
    bill += unit * 0.75;
    charge.push(unit * 0.75);
  } else {
    bill = unit * 0.5;
    charge.push(unit * 0.5);
  }

  const chargeVal = bill * 0.2;
  const tempTotal = bill;
  bill = bill + bill * 0.2;

  first.innerText = charge.at(0)?.toFixed(2) || 0;
  second.innerText = charge.at(1)?.toFixed(2) || 0;
  third.innerText = charge.at(2)?.toFixed(2) || 0;
  fourth.innerText = charge.at(3)?.toFixed(2) || 0;
  surcharge.innerText = chargeVal?.toFixed(2) || 0;
  subtotal.innerText = tempTotal?.toFixed(2) || 0;
  grandtotal.innerText = bill?.toFixed(2) || 0;
}

function reset() {
  document.getElementById("unit").value = 0;
  document.getElementById("first").innerText = 0;
  document.getElementById("second").innerText = 0;
  document.getElementById("third").innerText = 0;
  document.getElementById("fourth").innerText = 0;
  document.getElementById("subtotal").innerText = 0;
  document.getElementById("surcharge").innerText = 0;
  document.getElementById("grandtotal").innerText = 0;
}
