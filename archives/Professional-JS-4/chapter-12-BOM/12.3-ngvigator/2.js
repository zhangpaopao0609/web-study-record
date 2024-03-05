const hasPlugin = function(name) {
  for(const plugin of navigator.plugins) {
    if(plugin.name.toLowerCase().indexOf(name.toLowerCase()) !== -1) {
      console.log('has yo!');
      return;
    }
  }
  console.log('no yo!');
  return;
}

hasPlugin('chrome')
console.log(navigator);
console.log(history);
setTimeout(() => {
  location.hash = 'arrow';
  history.pushState({arrow: 'arrow'}, 'title')
  // history.pushState({arrow: 'arrow'}, 'title', 'baz.html')

}, 1000);
window.onhashchange = function() {
  console.log('hash change');
  console.log(history);
}

window.onpopstate = event => {
  const state = event.state;
  if(state) {
    console.log(state, 123);
  }
}