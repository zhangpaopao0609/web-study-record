console.log("pageXOffset", pageXOffset);
console.log("pageYOffset", pageYOffset);
console.log("scrollX", scrollX);
console.log("scrollY", scrollY);


window.onclick = function() {
  scrollTo({
    left: 0,
    top:0,
    behavior: 'smooth'
  })
}
