const arrow = {
  info: {
    name: 'arrow'
  },
  get name() {
    return this.info.name;
  },
  set name(newVal) {
    this.info.name = newVal;
  }
};

console.log(arrow.name);
arrow.name = 'internation-arrow';
console.log(arrow.name);
