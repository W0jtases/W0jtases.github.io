let x;

function losowanie() {
  x = Math.floor(Math.random() * 385) + 1;
  console.log(x);

  if (x >= 1 && x <= 305) {
    console.log("blue");
    document.getElementById("p1").innerHTML =
      '<img class="blue" src="blue.png" />' + "79.92%";
  } else if (x > 305 && x <= 369) {
    console.log("purple");
    document.getElementById("p1").innerHTML =
      '<img class="purple" src="purple.png" />' + "	15.98%";
  } else if (x > 369 && x <= 381) {
    console.log("pink");
    document.getElementById("p1").innerHTML =
      '<img class="pink" src="pink.png" />' + "3.2%";
  } else if (x > 381 && x <= 384) {
    console.log("red");
    document.getElementById("p1").innerHTML =
      '<img class="red" src="red.png" />' + "0.64%";
  } else if (x === 385) {
    console.log("gold");
    document.getElementById("p1").innerHTML =
      '<img class="gold" src="gold.png" />' + "0.26%";
  }
}

document.getElementById("klucz").addEventListener("click", losowanie);
