function submit() {
  const name = document.getElementById("name").value.trim().toLowerCase();
  const dob = document.getElementById("dob").value.trim();
  const number = document.getElementById("number").value.trim();
  const email = document.getElementById("email").value.trim();

  //   for(let i=0;i<name.length;i=i+1){
  //     if(name.charAt(i)===" ") continue;
  //     if(name.charAt(i)<"a" || name.charAt(i)>"z"){
  //         alert(`Name is invalid because you use ${name.charAt(i)}`);
  //         return;
  //     }
  //   }

  //Regular Expression

  if (!/^[A-Za-z ]+$/.test(name)) {
    alert("Name is Invalid");
    return;
  }

  if (!/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(email)) {
    alert("Email is Invalid");
    return;
  }

  if (!/^[6-9]\d{9}$/.test(number)) {
    alert("number is Invalid");
    return;
  }

  const today = new Date().toISOString();
  const date1 = today.split("-");
  const date2 = dob.split("-");
  if (date1[0] - date2[0] < 18) {
    alert(`Your age is ${date1[0] - date2[0]}.You are a minor`);
    return;
  }

  const data = {
    name,
    email,
    number,
    email,
    dob,
  };

  console.log(data);
}
