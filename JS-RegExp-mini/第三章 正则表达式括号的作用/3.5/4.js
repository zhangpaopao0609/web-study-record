function dasherize(str) {
  return str
          .replace(/([A-Z])/g, '-$1')
          .replace(/[_\s]+/g, '-')
          .toLowerCase();
}

console.log(dasherize('MozTransform'));