window.onclick = function() {
  const newOne = window.open('http://www.baidu.com', '_blank', "location=no, width=200, height=200, top=0, left=0");
  // newOne.resizeTo(500, 500)
  newOne.moveTo(100,100);
  setTimeout(() => {
    newOne.close()
  
  }, 1000);
}
