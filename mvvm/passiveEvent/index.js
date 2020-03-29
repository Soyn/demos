const test = document.getElementById("test");
const test1 = document.getElementById("test1");
const scrollTop = document.querySelector(".scroll-top");
const target1 = document.querySelector("#test>.content");
const target2 = document.querySelector("#test1>.content");

console.log("taget1 ", target1);
console.log("scroll top", scrollTop);
test.addEventListener("touchstart", e => {
  for (let i = 0; i < 10000000; i += 1) {
    for (let j = 0; j < 100; j += 1) {}
  }
});
test.addEventListener("scroll", () => {
  const top = target1.getClientRects()[0].top;
  scrollTop.innerHTML = `Top: ${top}`;
});
test1.addEventListener("scroll", () => {
  const top = target2.getClientRects()[0].top;
  scrollTop.innerHTML = `Top: ${top}`;
});
test1.addEventListener(
  "touchstart",
  e => {
    let sum = 0;
    for (let i = 0; i < 10000000; i += 1) {
      for (let j = 0; j < 100; j += 1) {}
    }
  },
  { passive: true }
);
