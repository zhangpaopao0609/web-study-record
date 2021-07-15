function component() {
  const element = document.createElement('div');

  element.innerHTML = join(['Hello', 'webpack'], ' ');

  this.alert('Humm, this probably isn\'t a great idea...');

  return element;
}

document.body.appendChild(component());